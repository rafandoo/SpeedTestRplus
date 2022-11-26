import speedtest

def sTest(servers, threads, secure, pre_allocate, timeout):
    """
    It runs a speedtest using the speedtest-cli library, and returns the results as a dictionary
    
    :param servers: A list of servers to test against. If this is not provided, the closest servers
    based on geographic distance will be used
    :param threads: The number of threads to use for the test
    :param secure: Whether to use HTTPS or HTTP
    :return: A dictionary of the results of the speedtest.
    """
    s = speedtest.Speedtest(secure = secure, timeout = timeout)
    s.get_servers(servers)
    s.get_best_server()
    s.download(threads = threads)
    s.upload(pre_allocate = pre_allocate, threads = threads)
    return s.results.dict()

def toMbps(bps):
    """
    It takes in a speed in bits per second and returns the speed in Mbps
    
    :param bps: The speed in bits per second
    :return: The speed in Mbps 
    """
    return round(bps / 1000000, 2)
