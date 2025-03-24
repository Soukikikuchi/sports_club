// JavaScript for POWER KIDS Sports Club Website

document.addEventListener('DOMContentLoaded', function() {
  // ヘッダースクロール効果
  const header = document.querySelector('.header');
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });

  // モバイルメニュー
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('.header__nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('header__menu-btn--active');
      nav.classList.toggle('header__nav--mobile');
      nav.classList.toggle('active');
    });
  }

  // スケジュールタブ
  const scheduleTabs = document.querySelectorAll('.schedule__tab');
  const scheduleContents = document.querySelectorAll('.schedule__table-wrapper');

  if (scheduleTabs.length && scheduleContents.length) {
    scheduleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // タブのアクティブ状態を切り替え
        scheduleTabs.forEach(t => t.classList.remove('schedule__tab--active'));
        tab.classList.add('schedule__tab--active');
        
        // コンテンツの表示を切り替え
        const targetId = tab.getAttribute('data-target');
        scheduleContents.forEach(content => {
          content.classList.remove('schedule__table-wrapper--active');
          if (content.id === targetId) {
            content.classList.add('schedule__table-wrapper--active');
          }
        });
      });
    });
  }

  // スクロールアニメーション
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkFade() {
    const triggerBottom = window.innerHeight * 0.8;
    
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('visible');
      }
    });
  }
  
  // 初期チェック
  checkFade();
  
  // スクロール時にチェック
  window.addEventListener('scroll', checkFade);

  // セクションタイトルのネオン効果
  const sectionTitles = document.querySelectorAll('.section__title');
  
  sectionTitles.forEach(title => {
    const text = title.textContent;
    title.setAttribute('data-text', text);
  });

  // フォーム送信処理
  const contactForm = document.querySelector('.contact__form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // フォームデータの取得
      const formData = new FormData(contactForm);
      const formValues = {};
      
      for (const [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      
      // 実際の送信処理はここに実装
      // この例ではアラートを表示するだけ
      alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');
      
      // フォームリセット
      contactForm.reset();
    });
  }

  // スムーズスクロール
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // モバイルメニューが開いている場合は閉じる
        if (nav.classList.contains('active')) {
          menuBtn.classList.remove('header__menu-btn--active');
          nav.classList.remove('active');
        }
      }
    });
  });

  // 画像の遅延読み込み
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
});
