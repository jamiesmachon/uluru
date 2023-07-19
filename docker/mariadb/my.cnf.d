# Copyright (c) 2016, Oracle and/or its affiliates. All rights reserved.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA

!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/

[mysqld]

# innodb_force_recovery = 1

# PLEASE DO NOT EDIT
# Limits
performance_schema = ON
log-error=/var/lib/mysql/errors.err
max_connections=1000
max_user_connections=500
sql_mode=""
max_connect_errors = 100

default_storage_engine=InnoDB
local_infile=0

open_files_limit=40000
port = 3306
socket = "/var/lib/mysql/mysql.sock"
pid_file = "/var/lib/mysql/mysql.pid"
skip_external_locking

## Buffers and Connections
key_buffer_size = 32M
max_allowed_packet = 1073741824
thread_stack = 256K
thread_cache_size = 16K
table_open_cache = 4000
table_definition_cache=2k
sort_buffer_size = 512K
read_buffer_size = 512K
read_rnd_buffer_size = 512K
join_buffer_size = 512K
query_cache_type = 0
query_cache_size = 0
query_cache_limit = 64M

concurrent_insert=2
interactive_timeout=600
wait_timeout=600
connect_timeout=60
net_read_timeout=600
net_write_timeout=600

low_priority_updates=1

max_heap_table_size = 512M
bulk_insert_buffer_size = 64M
tmp_table_size = 512M

## Number of CPU's*2 for thread_concurrency
# thread_concurrency = 10

## InnoDB Engine
innodb_file_per_table=1

innodb_data_home_dir = "/var/lib/mysql/"
innodb_log_group_home_dir = "/var/lib/mysql/"
innodb_buffer_pool_size = 20G
innodb_buffer_pool_instances = 32
innodb_read_io_threads=8
innodb_write_io_threads=8
innodb_status_file
innodb_flush_log_at_trx_commit = 2
innodb_table_locks=0
innodb_log_buffer_size = 32M

innodb_log_file_size = 1536M
innodb_lock_wait_timeout = 300
innodb_thread_concurrency=16
innodb_commit_concurrency=8
innodb_flush_method=O_DIRECT

## TX Isolation
transaction-isolation=REPEATABLE-READ

default-storage-engine=InnoDB
unix_socket=OFF