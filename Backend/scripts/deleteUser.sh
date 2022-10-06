#!/bin/bash
sshpass -p 'Clu$ter#iri' autossh admin@192.168.15.204 "ipa user-del $1"



sshpass -p 'HPC-Admin' autossh -o StrictHostKeyChecking=no root@192.168.15.201 "rm -rf /home/$1"
sshpass -p 'HPC-Admin' autossh -o StrictHostKeyChecking=no root@192.168.15.201 "rm -rf /stage/$1"

sshpass -p 'xyma' autossh -o StrictHostKeyChecking=no root@10.140.0.212 "rm -rf /home/$1"