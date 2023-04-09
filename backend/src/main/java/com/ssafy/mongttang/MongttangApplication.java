package com.ssafy.mongttang;

import com.ssafy.mongttang.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties(AppProperties.class)
public class MongttangApplication {

	public static void main(String[] args) {
		SpringApplication.run(MongttangApplication.class, args);
	}

}
