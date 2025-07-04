// Funcionalidade dos modais (mantida do código original)
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.getAttribute('data-item');
    const modal = document.getElementById('modal-' + key);
    if (modal) {
      modal.style.display = 'flex';
    }
  });
});

document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-close');
    const modal = document.getElementById('modal-' + key);
    if (modal) {
      modal.style.display = 'none';
    }
  });
});

window.addEventListener('click', e => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Funcionalidade do menu hamburger (mantida do código original)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (e) => {
  const isClickInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);
  if (!isClickInsideNav) {
    navLinks.classList.remove('show');
  }
});

const navLinksList = document.querySelectorAll('.nav-links li a');

navLinksList.forEach(link => {
  link.addEventListener('click', () => {
    // Fecha o menu mobile se estiver aberto
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// NOVA FUNCIONALIDADE: Sistema de Abas Principais
document.addEventListener('DOMContentLoaded', function() {
  // Funcionalidade das abas principais
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove classe active de todos os botões e conteúdos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Adiciona classe active ao botão clicado e seu conteúdo correspondente
      button.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Funcionalidade das sub-abas (para Tortas e Bebidas)
  const subTabButtons = document.querySelectorAll('.sub-tab-button');
  const subTabContents = document.querySelectorAll('.sub-tab-content');

  subTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSubTab = button.getAttribute('data-subtab');
      const parentTab = button.closest('.tab-content');
      
      // Remove classe active apenas das sub-abas dentro da aba pai
      const parentSubButtons = parentTab.querySelectorAll('.sub-tab-button');
      const parentSubContents = parentTab.querySelectorAll('.sub-tab-content');
      
      parentSubButtons.forEach(btn => btn.classList.remove('active'));
      parentSubContents.forEach(content => content.classList.remove('active'));
      
      // Adiciona classe active ao botão clicado e seu conteúdo correspondente
      button.classList.add('active');
      const targetSubContent = document.getElementById(targetSubTab);
      if (targetSubContent) {
        targetSubContent.classList.add('active');
      }
    });
  });

  // Função para resetar sub-abas quando uma nova aba principal é selecionada
  function resetSubTabs(tabId) {
    const tab = document.getElementById(tabId);
    if (tab) {
      const firstSubButton = tab.querySelector('.sub-tab-button');
      const firstSubContent = tab.querySelector('.sub-tab-content');
      
      if (firstSubButton && firstSubContent) {
        // Remove active de todas as sub-abas desta aba
        tab.querySelectorAll('.sub-tab-button').forEach(btn => btn.classList.remove('active'));
        tab.querySelectorAll('.sub-tab-content').forEach(content => content.classList.remove('active'));
        
        // Ativa a primeira sub-aba
        firstSubButton.classList.add('active');
        firstSubContent.classList.add('active');
      }
    }
  }

  // Adiciona listener para resetar sub-abas quando aba principal muda
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      setTimeout(() => resetSubTabs(targetTab), 50); // Pequeno delay para garantir que a aba principal foi ativada
    });
  });

  // Inicialização: garante que as primeiras abas estejam ativas
  const firstTab = document.querySelector('.tab-button.active');
  if (firstTab) {
    const firstTabId = firstTab.getAttribute('data-tab');
    resetSubTabs(firstTabId);
  }
});

// Função para smooth scroll melhorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Adiciona efeito de fade-in aos itens do menu quando ficam visíveis
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Aplica o observer aos itens do menu quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
});

