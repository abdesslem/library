package io.github.jhipster.application.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Administrateur.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Administrateur.class.getName() + ".commandes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Abonne.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Livre.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Livre.class.getName() + ".commandes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Categorie.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Retour.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Emprunt.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Commande.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Commande.class.getName() + ".livres", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Fournisseur.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Fournisseur.class.getName() + ".commandes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
