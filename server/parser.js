export function parseSARFile(content) {
  const lines = content.split('\n');
  const data = {
    cpu: [],
    memory: [],
    disk: [],
    network: [],
    process: [],
    swap: [],
    diskUsage: []
  };

  let currentSection = null;
  let headers = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detect section headers
    if (line.includes('CPU') && line.includes('%usr')) {
      currentSection = 'cpu';
      headers = line.split(/\s+/);
      continue;
    } else if (line.includes('kbmemfree')) {
      currentSection = 'memory';
      headers = line.split(/\s+/);
      continue;
    } else if (line.includes('DEV') && line.includes('tps')) {
      currentSection = 'disk';
      headers = line.split(/\s+/);
      continue;
    } else if (line.includes('IFACE') && line.includes('rxpck/s')) {
      currentSection = 'network';
      headers = line.split(/\s+/);
      continue;
    } else if (line.includes('proc/s')) {
      currentSection = 'process';
      headers = line.split(/\s+/);
      continue;
    } else if (line.includes('pswpin/s')) {
      currentSection = 'swap';
      headers = line.split(/\s+/);
      continue;
    }

    // Skip average lines and section breaks
    if (line.startsWith('Average:') || line.startsWith('Linux ')) {
      currentSection = null;
      continue;
    }

    // Parse data lines
    if (currentSection && !line.includes('CPU') && !line.includes('IFACE') && !line.includes('DEV')) {
      const parts = line.split(/\s+/);

      if (parts.length < 2) continue;

      const timeStr = parts[0] + ' ' + parts[1];

      if (currentSection === 'cpu' && parts[2] !== undefined) {
        // CPU data
        const cpuId = parts[2];
        if (cpuId === 'all' || !isNaN(cpuId)) {
          data.cpu.push({
            time: timeStr,
            cpu: cpuId,
            usr: parseFloat(parts[3]) || 0,
            nice: parseFloat(parts[4]) || 0,
            sys: parseFloat(parts[5]) || 0,
            iowait: parseFloat(parts[6]) || 0,
            steal: parseFloat(parts[7]) || 0,
            irq: parseFloat(parts[8]) || 0,
            soft: parseFloat(parts[9]) || 0,
            guest: parseFloat(parts[10]) || 0,
            gnice: parseFloat(parts[11]) || 0,
            idle: parseFloat(parts[12]) || 0
          });
        }
      } else if (currentSection === 'memory' && parts[2] !== undefined) {
        // Memory data
        data.memory.push({
          time: timeStr,
          kbmemfree: parseInt(parts[2]) || 0,
          kbavail: parseInt(parts[3]) || 0,
          kbmemused: parseInt(parts[4]) || 0,
          memused: parseFloat(parts[5]) || 0,
          kbbuffers: parseInt(parts[6]) || 0,
          kbcached: parseInt(parts[7]) || 0,
          kbcommit: parseInt(parts[8]) || 0,
          commit: parseFloat(parts[9]) || 0
        });
      } else if (currentSection === 'disk' && parts[2] !== undefined) {
        // Disk data - filter out loop and sr devices, keep real disks
        const device = parts[2];
        if (!device.startsWith('loop') && !device.startsWith('sr')) {
          data.disk.push({
            time: timeStr,
            device: device,
            tps: parseFloat(parts[3]) || 0,
            rkBs: parseFloat(parts[4]) || 0,
            wkBs: parseFloat(parts[5]) || 0,
            dkBs: parseFloat(parts[6]) || 0,
            util: parseFloat(parts[10]) || 0
          });
        }
      } else if (currentSection === 'network' && parts[2] !== undefined) {
        // Network data
        const iface = parts[2];
        if (iface !== 'lo') { // Skip loopback
          data.network.push({
            time: timeStr,
            iface: iface,
            rxpck: parseFloat(parts[3]) || 0,
            txpck: parseFloat(parts[4]) || 0,
            rxkB: parseFloat(parts[5]) || 0,
            txkB: parseFloat(parts[6]) || 0
          });
        }
      } else if (currentSection === 'process' && parts[2] !== undefined) {
        // Process data
        data.process.push({
          time: timeStr,
          procs: parseFloat(parts[2]) || 0,
          cswch: parseFloat(parts[3]) || 0
        });
      } else if (currentSection === 'swap' && parts[2] !== undefined) {
        // Swap data
        data.swap.push({
          time: timeStr,
          pswpin: parseFloat(parts[2]) || 0,
          pswpout: parseFloat(parts[3]) || 0
        });
      }
    }
  }

  // Parse df data (disk usage)
  let inDfSection = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '-- df --') {
      inDfSection = true;
      continue;
    }

    if (line === '-- end df --') {
      inDfSection = false;
      break;
    }

    if (inDfSection && line && !line.startsWith('Filesystem')) {
      const parts = line.split(/\s+/);
      if (parts.length >= 6) {
        const filesystem = parts[0];
        // Skip tmpfs and other virtual filesystems, focus on real disks
        if (!filesystem.startsWith('tmpfs') && filesystem.startsWith('/dev/')) {
          data.diskUsage.push({
            filesystem: filesystem,
            size: parseInt(parts[1]) || 0, // in KB
            used: parseInt(parts[2]) || 0,
            available: parseInt(parts[3]) || 0,
            usePercent: parseInt(parts[4]) || 0,
            mountPoint: parts[5]
          });
        }
      }
    }
  }

  return data;
}
