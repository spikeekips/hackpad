from spikeekips/ubuntu

# build environment
ENV SCALA_HOME="/usr/share/java"
ENV SCALA="$SCALA_HOME/bin/scala"
ENV SCALA_LIBRARY_JAR="$SCALA_HOME/libexec/lib/scala-library.jar"
ENV JAVA_HOME="/usr/share/java"
ENV JAVA="/usr/bin/java"
ENV JAVA_OPTS="-Xbootclasspath/p:../infrastructure/lib/rhino-js-1.7r3.jar:$SCALA_LIBRARY_JAR"
ENV MYSQL_CONNECTOR_JAR="$PWD/lib/mysql-connector-java-5.1.34-bin.jar"
ENV PATH="$JAVA_HOME/bin:$SCALA_HOME/bin:$PATH"

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

RUN sed -i -e 's/archive/kr.&/g' /etc/apt/sources.list
RUN apt-get -y update && apt-get install -yf openjdk-7-jdk scala

ADD . /hackpad

WORKDIR /hackpad

RUN rm -rf .git
RUN echo '' > ./bin/export.sh
RUN ./bin/build.sh

RUN apt-get remove -y $(dpkg -l | grep '\-dev' | awk '{print $2}')
RUN apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY bin/docker-entrypoint-without-mysql.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 9000
