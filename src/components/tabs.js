const ipc = require('electron').ipcRenderer;
var selectedTab = require('./selectedTab');
var path = require('path');

var docPath = path.join(__dirname, '../docs/欢迎使用.md');
var docBaseName = path.basename(docPath);

var defaultTab = {
  label: docBaseName,
  name: docPath
}

Vue.component('v-tabs', {
  template: '\
    <el-tabs v-model="activeName" type="card" editable @tab-click="handleClick" @tab-remove="removeTab" @tab-add="addTab">\
      <el-tab-pane v-for="item in items" :key="item.name" v-bind:label="item.label | shortTitle" v-bind:name="item.name"></el-tab-pane>\
    </el-tabs>\
  ',
  filters: {
    shortTitle: function (value) {
      let maxLabelLength = 10;
      if (value.length > maxLabelLength) {
        return value.slice(0, maxLabelLength) + '...'
      } else {
        return value;
      }
    }
  },
  data: function () {
    return {
      items: [],
      activeName: '',
      tabIndex: 1
    }
  },
  mounted: function () {
    var vm = this;
    this.items.push(defaultTab);
    this.activeName = defaultTab.name;
    selectedTab.$emit('on-selected', defaultTab.name);

    ipc.on('selected-files', function (event, filePath) {
      var newTab = {
        label: path.basename(filePath[0]),
        name: filePath[0]
      }
      vm.items.push(newTab);
      vm.activeName = newTab.name;
      selectedTab.$emit('on-selected', newTab.name)
    })
  },
  methods: {
    handleClick(tab, event) {
      selectedTab.$emit('on-selected', tab.name)
    },
    addTab() {
      ipc.send('open-file-dialog');
    },
    removeTab(targetName) {
      let tabs = this.items;
      let tabName = this.activeName;
      if (tabName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              tabName = nextTab.name;
            }
          }
        })
      }

      this.activeName = tabName;
      this.items = tabs.filter(tab => tab.name !== targetName)

      if (this.items.length > 0) {
        selectedTab.$emit('on-selected', tabName)
      } else {
        ipc.send('tab-all-closed');
      }
    }
  }
});
