from time import sleep
import tester
import configparser
import requests

def createConfig():
    """
    It creates a config file with the name config.ini
    """
    config = configparser.ConfigParser()
    config['OPTIONS'] = {
        "Timeout" : 10,
        "Loop" : 1,
        "Wait" : 1 
    }
    config['SERVER'] = {
        "Threads" : 0,
        "Secure" : False,
        "Pre_allocate" : False
    }
    with open('config.ini', 'w') as f:
        config.write(f)

def readConfig():
    """
    It reads the config.ini file and returns the config object
    :return: The config object
    """
    config = configparser.ConfigParser()
    config.read('config.ini')
    return config

def init(config):
    if config.sections() == []:
        createConfig()
        init(readConfig())
    
    threads = int(config['SERVER']['Threads'])
    secure = config['SERVER']['Secure']
    pre_allocate = config['SERVER']['Pre_allocate']
    timeout = int(config['OPTIONS']['Timeout'])
    loop = int(config['OPTIONS']['Loop'])
    wait = int(config['OPTIONS']['Wait']) * 60
    
    i = 0
    while True:
        i += 1
        resultDict = tester.sTest([], threads, secure, pre_allocate, timeout)
        data = {
            "download" : tester.toMbps(resultDict['download']),
            "upload" : tester.toMbps(resultDict['upload']),
            "ping" : resultDict['ping'],
            "latency" : resultDict['server']['latency'],
            "sponsor" : resultDict['server']['sponsor'],
        }
        
        r = requests.post('http://127.0.0.1:8000/send', data=data)
        
        if i == loop and loop != 0: exit()
        sleep(wait)

if __name__ == '__main__':
    init(readConfig())
