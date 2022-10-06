#!/bin/bash
sshpass -p 'Clu$ter#iri' autossh admin@192.168.15.204 "ipa user-disable $1"