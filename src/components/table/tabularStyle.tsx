import { createGlobalStyle } from 'styled-components';

export const TableStyles = createGlobalStyle`
  .action-btn {
    padding: 8px 16px;
    font-size: 20px;
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: 9999px;
    transition: all 0.3s;
  }
  
  .action-btn:hover {
    background: #E2EDFA;
  }
  .tabulator-cell {
    position: relative;
  }
  
  .popup-menu {
    position: absolute;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    min-width: 150px;
    z-index: 9999;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    text-align: right;
    font-size: 14px;
    transition: all 0.3s;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  
  .menu-item:first-child {
    border-radius: 12px 12px 0 0;
  }
  
  .menu-item:last-child {
    border-radius: 0 0 12px 12px;
  }
  
  .menu-item:hover {
    background: #E2EDFA;
  }
  
  .menu-item.edit-btn {
    color: #2563EB;
  }
  
  .menu-item.print-btn {
    color: #DC2626;
  }
`;