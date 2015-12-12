FROM spikeekips/ubuntu

# build env
ENV LC_ALL C
ENV SCALA_HOME /opt/scala
ENV SCALA $SCALA_HOME/bin/scala
ENV SCALA_LIBRARY_JAR $SCALA_HOME/lib/scala-library.jar
ENV JAVA_HOME /opt/java
ENV JAVA /opt/java/bin/java
ENV JAVA_OPTS -Xbootclasspath/p:../infrastructure/lib/rhino-js-1.7r3.jar:$SCALA_LIBRARY_JAR
ENV MYSQL_CONNECTOR_JAR /hackpad/lib/mysql-connector-java-5.1.34-bin.jar
ENV PATH $JAVA_HOME/bin:$SCALA_HOME/bin:$PATH

# properties
ENV HACKPAD_DOMAIN localhost
ENV HACKPAD_AWS_REGION ap-northeast-1
ENV HACKPAD_EMAIL_ADDRESSES_WITH_ADMIN_ACCESS root@localhost.localdomain
ENV HACKPAD_DBC_DBSERVER db
ENV HACKPAD_DBC_DBPORT 3306
ENV HACKPAD_DBC_DBNAME hackpad
ENV HACKPAD_DBC_DBUSER root
ENV HACKPAD_DBC_DBPASS 1
ENV HACKPAD_SMTP_USER ""
ENV HACKPAD_SMTP_PASSWORD ""
ENV HACKPAD_AWS_KEY_ID ""
ENV HACKPAD_AWS_SECRET ""
ENV HACKPAD_AWS_ATTACHMENTS_BUCKET hackpad
ENV HACKPAD_BRAND_NAME Hackpad
ENV HACKPAD_SSOSCRIPT ""
ENV HACKPAD_IS_PRODUCTION false
ENV HACKPAD_SMTP_SERVER ""
ENV HACKPAD_SUPERUSER_EMAIL_ADDRESSES ""
ENV HACKPAD_VERBOSE true
ENV HACKPAD_LOCATION_AFTER_SIGNOUT ""

EXPOSE 80

# init
RUN rm -rf /etc/service/cron /etc/service/sshd /etc/service/syslog-forwarder /etc/service/syslog-ng
RUN /etc/my_init.d/00_regen_ssh_host_keys.sh
CMD ["/sbin/my_init"]

# build
RUN curl -L -o /tmp/jdk.tar.gz --insecure -H "Cookie: oraclelicense=accept-securebackup-cookie"  http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-linux-x64.tar.gz; curl -L -o /tmp/scala.tar.gz http://downloads.typesafe.com/scala/2.11.7/scala-2.11.7.tgz; cd /tmp; tar zxf /tmp/jdk.tar.gz -C /opt; ln -s /opt/jdk1.8.0_60 /opt/java; tar zxf /tmp/scala.tar.gz -C /opt; ln -s /opt/scala-2.11.7 /opt/scala; rm -rf /tmp/*

RUN mkdir -p /etc/service/hackpad
ADD bin/docker-entrypoint-without-mysql.sh /etc/service/hackpad/run
RUN chmod +x /etc/service/hackpad/run

ADD . /hackpad
WORKDIR /hackpad

RUN echo '' > ./bin/exports.sh
RUN ./bin/build.sh
ADD contrib/scripts/oauth2_proxy_ssoscript /oauth2_proxy_ssoscript

# clean
RUN apt-get remove -y $(dpkg -l | grep '\-dev' | awk '{print $2}') dbus python3-dbus dosfstools eject lsb-release syslog-ng-core net-tools python3-gi openssh-client openssh-server openssh-sftp-server parted cron language-pack-en language-pack-en-base
RUN apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# vim: set ft=Dockerfile
