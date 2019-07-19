# CSS 动画  
> 本文参考 [CSS动画简介-阮一峰](https://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
#
## CSS Transition
+ **基本用法**   

*Transition* （过度），指定状态变化所需要的时间
```scss
    div {
        width:100px;
        height:100px;
        transition: 1s; // transition: 1s height, 2s width; 分别指定高度，宽度时间轴
        &:hover{
            width:500px;
            height:500px;
        }
    }
```  
+ **transtion-delay**
> delay的真正意义在于，它指定了动画发生的顺序，使得多个不同的transition可以连在一起，形成复杂效果
```css
    /* 让height先发生变化并结束之后，width再变化 */
    div {
        transition: 1s height, 1s 1s width;
    }
```  

+ **transition-timing-function**  
transition的状态变化速度(*timing function*),默认为ease——非匀速
>timing function 可选模式  
>+ linear —— 匀速
>+ ease-in —— 加速 
>+ ease-out —— 减速 
>+ cubic-bezier函数 —— 自定义速度  

关于自定义速度，可进一步了解:  
 [**贝塞尔曲线**](https://zh.javascript.info/css-animations#bei-sai-er-qu-xian-beziercurve)  
 [**阶跃函数**](https://zh.javascript.info/css-animations#jie-yue-han-shu-steps)


+ **transition的各项属性**  
  transition 完整写法：
  ` div { transition: 1s 1s height ease } `  
也可单独定义各属性
```scss
    div {
        transition:{
            property:height;
            duration: 1s;
            delay: 1s;
            timing-function:ease;
        }
    }
```  
+ **使用注意事项**
>1. 目前，各大浏览器（包括IE 10）都已经支持无前缀的transition，所以transition已经可以很安全地不加浏览器前缀。  
>2. 不是所有的CSS属性都支持transition，完整的列表查看这里，以及具体的效果。  
>3. transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。  

+ **transition局限**
>1. transition需要事件触发，所以没法在网页加载时自动发生。
>2. transition是一次性的，不能重复发生，除非一再触发。
>3. transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。
>4. 一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

# 
## CSS Animation
+ 基本用法  
CSS animation 需指定一个动画周期以及动画效果
```scss
    @keyframes rainbow{ // 定义 rainbow 动画效果
        0% {background: $bg}
        10% {background: lightcoral}
        20% {background: orange}
        40% {background: yellow}
        60% {background: lightblue}
        80% {background: lightseagreen}
        90% {background: blue}
        100% {background: $bg}
    }

    .animation{
        background: gold;
        &:hover{
            animation: 4s rainbow infinite;     // inifinite 无限次播放
        }
    }
```
+ **animation-fill-mode**
```scss
    .animation{
        animation: 1s rainbow forwards; // forwards - 动画停留在结束状态
    }
```
>animation-fill-mode 可选值
>+ none —— 默认值 ， 回到动画没开始的状态
>+ forwards —— 动画停留在结束状态
>+ backwards —— 让动画回到第一帧的状态
>+ both —— 根据animation-direction（见后）轮流应用forwards和backwards规则

+ **animation-direction
> 动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。*animation-direction* 属性，可以改变这种行为   
可选项： normal (默认)  &nbsp;&nbsp;alternate&nbsp;&nbsp; reverse &nbsp;&nbsp;alternate-reverse
  
![animation-direction](https://www.ruanyifeng.com/blogimg/asset/201402/bg2014021401.png)  

+ **animation 各项属性**
```scss
    div {
        animation-name: rainbow;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 1s;
        animation-fill-mode:forwards;
        animation-direction: normal;
        animation-iteration-count: 3; // 重复次数
    }
```

+ **关键帧动画 —— Keyframes**
```scss
    @keyframes move-round {
        from {left: 0}
        to {left: 180px}
    }
    .move{
        @extend .block;
        background: $bg;
        position: relative;
        .move-item {
            position: absolute;
            height: 20px;
            width: 20px;
            background: lightcoral;
            animation: 2s move-round infinite alternate
        }
    }
```

+ **animation-play-state**
>有时，动画播放过程中，会突然停止。这时，默认行为是跳回到动画的开始状态,可使用 *animation-play-state* 进行更改
```scss
    @keyframes spin {
        from { transform: rotate(0) }
        to { transform: rotate(180deg)}
    }
    .play-state{
        @extend .block;
        background: $bg;
        animation: 2s spin forwards paused linear infinite alternate;
        &:hover{
            animation-play-state: running;
        }
    }
```