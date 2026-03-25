export const responsive = `
  * { box-sizing: border-box; }

  /* Navbar scroll horizontal en móvil */
  nav { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  nav::-webkit-scrollbar { display: none; }

  /* Grid de libros responsive */
  @media (max-width: 768px) {
    .books-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px !important;
    }
    .main-content {
      padding: 20px 16px !important;
    }
    .header-inner {
      padding: 14px 16px !important;
    }
    .logo-title {
      font-size: 20px !important;
    }
    .input-row {
      flex-direction: column !important;
    }
    .input-row input {
      min-width: unset !important;
      width: 100% !important;
    }
    .section-title {
      font-size: 22px !important;
    }
    .history-item {
      flex-direction: column !important;
    }
    .history-item img {
      width: 100% !important;
      height: 180px !important;
    }
  }

  @media (max-width: 480px) {
    .books-grid {
      grid-template-columns: repeat(1, 1fr) !important;
    }
    .nav-btn {
      padding: 12px 12px !important;
      font-size: 11px !important;
    }
    .overview-grid {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }
`;