package br.com.bluetasks.infrastructure.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.bluetasks.domain.user.AppUser;
import br.com.bluetasks.domain.user.AppUserRepository;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

	private AppUserRepository appUserRepository;
	
	@Autowired
	public UserDetailsServiceImp(AppUserRepository appUserRepository) {
		this.appUserRepository = appUserRepository;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = appUserRepository.findByUsername(username);
		
		if (appUser == null) {
			throw new UsernameNotFoundException(username);
		}
		
		return new UserDetailsImpl(appUser);
	}

}
