
document.addEventListener("DOMContentLoaded", () => {
    // Atualiza o ano do rodapé automaticamente
    const year = document.getElementById("year");
  
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  
    // Destaca a seção visível no menu
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("#inicio, #projetos");
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
  
            links.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
  
      sections.forEach((section) => observer.observe(section));
    }
  });
  