# The Results class is a container for the results of a speed test
class Results(object):

    def __init__(self, download, upload, ping, latency, sponsor):
        """
        This function is a constructor for the SpeedTest class. It takes in 5 parameters and assigns
        them to the class variables
        
        :param download: Download speed in Mbps
        :param upload: Upload speed in Mbps
        :param ping: The time it takes for a packet of data to go from your computer to a remote server
        and back
        :param latency: The time it takes for a packet of data to make a round trip from your computer
        to the server and back
        :param sponsor: The name of the server
        """
        self._download = download
        self._upload = upload
        self._ping = ping
        self._latency = latency
        self._sponsor = sponsor

    def getDownload(self):
        return self._download

    def setDownload(self, download):
        self._download = download

    def getUpload(self):
        return self._upload

    def setUpload(self, upload):
        self._upload = upload

    def getPing(self):
        return self._ping

    def setPing(self, ping):
        self._ping = ping
        
    def getLatency(self):
        return self._latency
    
    def setLatency(self, latency):
        self._latency = latency
        
    def getSponsor(self):
        return self._sponsor
    
    def setSponsor(self, sponsor):
        self._sponsor = sponsor
