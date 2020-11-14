package br.com.bluetasks.domain.test;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import br.com.bluetasks.domain.task.Task;
import br.com.bluetasks.domain.task.TaskRepository;
import br.com.bluetasks.domain.user.AppUser;
import br.com.bluetasks.domain.user.AppUserRepository;

@Component
public class InsertTestData {

	private TaskRepository taskRepository;
	private AppUserRepository appUserRepository;
	
	@Autowired
	public InsertTestData(TaskRepository taskRepository, AppUserRepository appUserRepository) {
		this.taskRepository = taskRepository;
		this.appUserRepository = appUserRepository;
	}

	@EventListener
	public void onApplicationEvent(ContextRefreshedEvent event) {
		PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		AppUser appUser = new AppUser("john", encoder.encode("abc"), "John Coder");
		appUserRepository.save(appUser);
		
		AppUser appUser2 = new AppUser("paul", encoder.encode("cba"), "Paul love");
		appUserRepository.save(appUser2);
		
		LocalDate baseDate = LocalDate.parse("2025-02-01");
		for (int i = 1; i <= 5; i++) {
			Task task = new Task(String.format("Tarefa do %s #%d", appUser.getUsername(), i), baseDate.plusDays(i), false);
			task.setAppUser(appUser);
			taskRepository.save(task);
		}
		
		for (int i = 1; i <= 5; i++) {
			Task task = new Task(String.format("Tarefa do %s #%d", appUser2.getUsername(), i), baseDate.plusDays(i), false);
			task.setAppUser(appUser2);
			taskRepository.save(task);
		}
	}
	
}
