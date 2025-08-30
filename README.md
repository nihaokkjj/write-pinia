## vuex和Pinia的区别

- Pinia的特点就是采用ts来进行编写的，类型提示友好，体积小，使用简单
- 去除mutations,state,getters,actions(包含了同步和异步)
- Pinia优势支持compositionApi同时也兼容optionsApi(this指向)
- Vuex中需要使用module来定义模块（嵌套问题），树结构，vuex中命名空间的概念(namespaced)。整个数据定义树的结构$store.state.a.b.c.xxx(createNamespaceHelpers()),所有的模块的状态会定义到根模块上，所以会出现模块覆盖根状态。
- vuex中允许程序有一个store.
- Pinia可以采用多个store
 -vuex中允许程序有一个store,
Pinia可以采用多个store,store之间可以互相调用（扁平化），不用担心命名冲突问题