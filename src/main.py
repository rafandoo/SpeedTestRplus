from time import sleep
import tester
import results
import actResults
import configparser

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

def init():
    config = configparser.ConfigParser()
    try:
        config.read('config.ini')
        threads = int(config['SERVER']['Threads'])
        secure = config['SERVER']['Secure']
        pre_allocate = config['SERVER']['Pre_allocate']
        timeout = int(config['OPTIONS']['Timeout'])
        loop = int(config['OPTIONS']['Loop'])
        wait = int(config['OPTIONS']['Wait']) * 60
    except:
        createConfig()
        init()
    
    i = 0
    while True:
        i += 1
        resultDict = tester.sTest([], threads, secure, pre_allocate, timeout)
        actResults.insertResults(results.Results(tester.toMbps(resultDict['download']), tester.toMbps(resultDict['upload']), resultDict['ping'], resultDict['server']['latency'], resultDict['server']['sponsor']))
        
        if i == loop and loop != 0: exit()
        sleep(wait)

if __name__ == '__main__':
    init()
