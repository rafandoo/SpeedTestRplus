from os import system
import sys
import threading

def params():
    """
    It returns the command line arguments passed to the script
    :return: The first argument of the command line.
    """
    return sys.argv[1:]

def execute(cmd):
    """
    It executes a command
    
    :param cmd: The command to execute
    """
    system(cmd)

def main(param):
    """
    It takes a list of parameters and executes the commands.
    
    :param param: The list of parameters passed to the script
    """
    for prm in param:
        if param == '-help':
            print('''
                This script runs multiple commands in parallel.
                Usage: python start.py [command]
                
                Parameters:
                -run: Runs the server and the python script
                -r: Resets the database
                ''')
            exit()
        if prm == '-run':
            cmd = ['python src/manage.py runserver 6080', 'python src/speedtest/main.py']
            execute('python src/manage.py migrate')
            threads = []
            for c in cmd:
                t = threading.Thread(target=execute, args=(c,))
                threads.append(t)
                t.start()
        if prm == '-r':
            execute('python manage.py flush --no-input')

if __name__ == '__main__':
    param = params()
    if param == []:
        print('''
        No parameter passed. Use -help to see the list of parameters.
        ''')
        exit()
    main(param)