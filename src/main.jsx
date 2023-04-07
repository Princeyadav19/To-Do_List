import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ConfigProvider } from 'antd';
ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1303fc',
        },
      }}
    >
      <App />
    </ConfigProvider>
)
