export default `
# Markdown 指南

Markdown是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，同时支持HTML语法和数学公式排版。

## 这是一个二级标题
### 这是一个三级标题
#### 这是一个四级标题

> 这是一个引用块 \\
> 转行
> > 二层引用块

这样可以**加粗**、*斜体*、***加粗并斜体***

1. 这是有序列表
2. 这是有序列表

<br>
（这样可以产生空行） 

- 这是一个列表
  - 这是次级列表
    - 这是再次级列表

<br>

这样插入一张图片
![图片]()

这样插入一个链接
[百度链接](https://www.baidu.com/)

## 数学公式可以使用latex语法

这样加入行内数学公式：$1+1=2$

这样加入块级数学公式：
$$
\\int \\frac{1}{x}dx = \\ln|x| + C
$$

薛定谔方程：
$$
i\\hbar\\frac{\\partial \\Psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\nabla^2\\Psi + V(\\vec{x},t)\\Psi
$$

支持更复杂的latex语法：
$$
W(f_1, f_2, \\cdots, f_n)(t) = \\left| \\begin{matrix} f_1 & f_2 & \\cdots & f_n \\newline f_1' & f_2' & \\cdots & f_n' \\newline \\vdots & \\vdots & \\ddots & \\vdots \\newline f_1^{(n-1)} & f_2^{(n-1)} & \\cdots & f_n^{(n-1)} \\end{matrix} \\right|
$$

## 代码
\`\`\`js
// 这样可以插入代码块
console.log('Hello world')
\`\`\`

\\
或者这样插入行内代码\`let a = 12\`
`
