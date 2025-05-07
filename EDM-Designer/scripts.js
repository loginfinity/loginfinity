// Initialize EDM editor with newsletter preset
const editor = grapesjs.init({
  container: '#editor',
  height: '100vh',
  fromElement: true,
  noticeOnUnload: false,
  storageManager: false,
  
  // Block manager configuration
  blockManager: {
    appendTo: '#blocks',
    blocks: [
      {
        id: 'text',
        label: 'Text',
        content: '<div data-gjs-type="text">Click to edit</div>'
      },
      {
        id: 'image',
        label: 'Image',
        content: '<div data-gjs-type="image"><img src="https://via.placeholder.com/350x250"/></div>'
      },
      {
        id: 'button',
        label: 'Button',
        content: '<div data-gjs-type="button">Click Here</div>'
      },
      {
        id: 'divider',
        label: 'Divider',
        content: '<hr data-gjs-type="divider">'
      }
    ]
  },

  // Newsletter plugin configuration
  plugins: ['grapesjs-preset-newsletter'],
  pluginsOpts: {
    'grapesjs-preset-newsletter': {
      modalTitleImport: 'Import HTML',
      newsletterBlocks: {
        blocks: ['button', 'divider', 'image', 'text', 'link']
      }
    }
  },
  assetManager: {
    uploadText: 'Drop files here',
    upload: true,  // 启用上传功能
    dropzone: 1,   // 允许拖放上传
    assets: [],     // 初始空素材库

    uploadFile: (e) => {
      const files = e.dataTransfer?.files || e.target.files;
    
      return Promise.all(
        Array.from(files).map(file => {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve({
              src: reader.result,
              name: file.name
            });
            reader.readAsDataURL(file);
          });
        })
      );
      reader.onload = () => {
        console.log(reader.result); // 查看 base64 字串是否正確
        resolve({ src: reader.result, name: file.name });
      };
    }
  },
  panels: {
    defaults: [{
      id: 'asset-panel',          // 必须存在的面板ID
      el: '.panel__right',        // 右侧面板容器
      buttons: [{
        id: 'show-assets',
        className: 'fa fa-image', // 素材管理器图标
        command: 'show-assets',   // 内置显示命令
        attributes: { title: 'Open Asset Manager' }
      }]
    }]
  }

});

// Set canvas dimensions for email standard
editor.on('load', () => {
  const canvas = editor.Canvas;
  canvas.getFrameEl().style.width = '600px';
  canvas.getBody().style.width = '600px';
});