<template>
  <div class="home">
    <el-button type="danger" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog v-model="dialogVisible" title="提示" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <div class="msg-box">
      <div class="msg-title">这里是子应用：</div>
      <div class="msg-context">{{ msg }}</div>
    </div>
    <div class="msg-box">
      <div class="msg-title">当前主应用姓名为:</div>
      <div class="msg-context">{{ vuexName.name }}</div>
    </div>
    <div class="msg-box">
      <el-input v-model="inputValue" type="text" placeholder="请输入你想广播的姓名" />
      <el-button type="primary" @click="handleVuexMsgChange">更新姓名</el-button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessageBox } from 'element-plus';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const dialogVisible = ref(false);
    const msg = ref('subapp-vue3');
    const vuexName = computed(() => store.state.global.user);
    const inputValue = ref('');

    // 调用vuex中setGlobalState更新全局状态
    const handleVuexMsgChange = () => {
      store.dispatch('global/setGlobalState', {
        user: {
          name: inputValue.value,
        },
      });
      inputValue.value = '';
    };

    const handleClose = done => {
      ElMessageBox.confirm('确认关闭？').then(() => {
        done();
      });
    };

    return {
      msg,
      vuexName,
      inputValue,
      handleVuexMsgChange,
      dialogVisible,
      handleClose,
    };
  },
};
</script>

<style lang="scss">
.msg-box {
  display: flex;
  margin: 20px auto;
  width: 800px;
  height: 30px;
  text-align: left;

  > .msg-title {
    width: 180px;
    font-weight: 600;
  }
  > .msg-context {
    flex: 1;
    font-weight: 600;
    color: #f56c6c;
  }

  > .msg-ipt-box,
  .msg-btn-box {
    flex: 0.5;
  }

  .msg-ipt {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 36px;
    line-height: 36px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .msg-btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0 0 0 15px;
    transition: 0.1s;
    font-weight: 500;
    padding: 7px 20px;
    font-size: 14px;
    border-radius: 4px;
    height: 36px;
    line-height: 22px;
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
}
</style>
