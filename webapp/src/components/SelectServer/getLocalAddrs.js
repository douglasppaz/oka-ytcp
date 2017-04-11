const RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

export default (addAddrs = () => {}) => {
  if (!RTCPeerConnection) return false;

  const addrs = Object.create(null);
  addrs['0.0.0.0'] = false;
  const updateAddrs = (newAddr) => {
    if (newAddr in addrs) return false;
    addrs[newAddr] = true;
    addAddrs(newAddr);
  };

  const grepSDP = (sdp) => {
    sdp.split('\r\n').forEach((line) => {
      if (~line.indexOf('a=candidate')) {
        const parts = line.split(' ');
        const addr = parts[4];
        const type = parts[7];
        if (type === 'host') updateAddrs(addr);
      } else if (~line.indexOf('c=')) {
        const parts = line.split(' ');
        const addr = parts[2];
        updateAddrs(addr);
      }
    });
  };

  const rtc = new RTCPeerConnection({ iceServers: [] });
  if (1 || window.mozRTCPeerConnection) {
    rtc.createDataChannel('', { reliable:false });
  }

  rtc.onicecandidate = (evt) => {
    if (evt.candidate) grepSDP(`a=${evt.candidate.candidate}`);
  };
  rtc.createOffer((offerDesc) => {
    grepSDP(offerDesc.sdp);
    rtc.setLocalDescription(offerDesc);
  }, (e) => { throw e; });
};
