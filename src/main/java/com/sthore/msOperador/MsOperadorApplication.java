package com.sthore.msOperador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsOperadorApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsOperadorApplication.class, args);
	}

}
