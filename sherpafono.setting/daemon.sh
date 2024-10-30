#!/bin/sh

USER_HOME="/home/$USER"
SHERPAFONO_ROOT="$USER_HOME/sherpafono.setting"
SHERPAFONO_HOME="$SHERPAFONO_ROOT"
DAEMON="node $SHERPAFONO_HOME/server.js"
PIDFILE=$SHERPAFONO_ROOT/sherpafono.setting.pid
touch $SHERPAFONO_ROOT/sherpafono.setting.log
touch $PIDFILE
case "$1" in
start)
        echo "Starting"
        /sbin/start-stop-daemon --start --background --pidfile $PIDFILE --make-pidfile -d $SHERPAFONO_ROOT --startas /bin/bash -- -c "exec $DAEMON >> $SHERPAFONO_ROOT/sherpafono.setting.log 2>&1"
        echo "."
        ;;
debug)
        echo "Debug mode: no backgrounding"
        /sbin/start-stop-daemon --start --pidfile $PIDFILE --make-pidfile -d $SHERPAFONO_ROOT --startas /bin/bash -- -c "exec $DAEMON  >> $SHERPAFONO_ROOT/sherpafono.setting.log 2>&1"
        echo "."
        ;;        
stop)
        echo "Stopping"
        /sbin/start-stop-daemon --stop --pidfile $PIDFILE
        echo "."
        ;;  
restart)
        echo "Restarting"
        /sbin/start-stop-daemon --stop --pidfile $PIDFILE
        /sbin/start-stop-daemon --start --pidfile $PIDFILE --make-pidfile --background -d $SHERPAFONO_ROOT --startas /bin/bash -- -c "exec $DAEMON >> $SHERPAFONO_ROOT/sherpafono.setting.log 2>&1"
        echo "."
        ;;


    *)
        echo "Usage: $0 {start|stop|restart|debug}" >&2
        exit 1
        ;;  
    esac
    exit
