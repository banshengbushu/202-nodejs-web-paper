# 基于 express + mongoose 的api 练习(2)

## 运行方式
1. 检查 config/default.json 中参数配置是否正确
2. 在命令行中执行如下命令
   ```bash
   npm start
   ```

3. 在浏览器中测试 http://localhost:3000
4. 在浏览器中测试 http://localhost:3000/homeworks 


## 练习要求

**重要：本题包含四个篇目：基础，进阶，做完一个篇目后，需要到 https://jinshuju.net/f/27Zpwx 提交做题记录**

### 基础篇
1. 创建model: homework 完成下列接口

   ```
   GET /homeworks  # 获取全部 homework
   GET /homeworks/:id	  # 获取一个 homework
   POST /homeworks   #增加一个 homework
   DELETE /homeworks/:id  # 删除一个 homework
   PUT /homeworks/:id	 # 更新一个 homework
   ```

2. 创建Model: section，section 与 homework 为多对多关系，并参照上面完成相应接口

3. 创建Model: paper，paper 与 section 为一对多关系，并参照上面完成相应接口

### 进阶篇
1. 自己编写刷数据库脚本创建上述数据库，并完成功能
2. 用 supertest + mocha 完成上述接口的集成测试
3. 用 inspector 调试功能解决问题
