# CF388B Fox and Minimal path 题解

## 题目大意
要求构造一个含有 $N(1\leqslant N\leqslant 1000)$ 个节点的简单无向图，使得从 $1$ 号节点到 $2$ 号节点恰有 $K$ 条最短路径（ $1\le K\le 10^9$ ）。输出你构造图的邻接矩阵表示。

## 解析

### step 1:建层连边

这道题要求我们构造一个图，使得从 $1$ 号节点到 $2$ 号节点恰有 $K$ 条最短路径。我们可以想到二进制拆分来做。我们联想到 Dijkstra ，将 $1$ 号节点看做是源点。如果将 $k$ 拆分成二进制的形式，那我们只需构造出距离源点有 $2^0$，$2^1$，$2^2​$，……条最短路就可以了。

接下来的目标，就是想办法构造出距离源点为 $2^0$，$2^1$，$2^2$，…… 的节点。通过观察发现，这是等比数列，公比为 $2$ 。于是，我们可以分出 $s=log_2 k+1$ 层，每层有 $2$ 个节点，每层节点之间不相连，相邻两层之间都要连上边，如下图所示：

![](https://img-blog.csdnimg.cn/img_convert/4cfb8bc1e9b940c6b1c73965e6c411fa.png)

但是，我们还要将源点放上去，也就是这样：

![](https://img-blog.csdnimg.cn/img_convert/ad7ae3234a397bf9c8b095d86750e851.png)

于是，可以得出，源点到第 $i$ 行的节点有 $2^{i-1}$ 条最短路。然后，在考虑每个节点的编号问题。首先， $1$ 号和 $2$ 号已经被用掉了，所以从 $3$ 号开始考虑。从简单方便的方面去想，第 $i$ 层的节点分别是 $2i+1$ 和 $2i+2$ 。接着，再是连边的事情。刚才提到了，第 $i$ 层的节点分别是 $2i+1$ 和 $2i+2$ ，可以得出第 $i$ 层的节点分别是 $2i+3$ 和 $2i+4$ ，所以有这几条边：$(2i+1,2i+3)$，$(2i+1,2i+4)$，$(2i+2,2i+3)$，$(2i+2,2i+4)$。 

### 2.建链拉边

建好了几个点之后，就想办法把这些点连在一起。我们在旁边再拉一条链出来，那就是这样：

![](https://img-blog.csdnimg.cn/img_convert/601631cb19aaa7ef6ca8922e9dbe284f.png)

为了方便研究，我们在点上标**源点到这个点的路径数**。

![](https://img-blog.csdnimg.cn/img_convert/ed987d397dc2e9475416939762ba8a0b.png)

接下来就好办了。假设 $k=5=1+4=2^0+2^2$，那就把第 $1$ 层和第 $3$ 层的其中**一个**节点与链上对应的点连边即可，就像这样子：

![](https://img-blog.csdnimg.cn/img_convert/2cec63faec30c3e663a3e9e16444f6d3.png)

就达到了目的。接下来，还是考虑节点编号的问题。首先，之前已经用掉了 $2s+2$ 个点，那么这一条链就从 $2s+3$ 开始。注意，最后一个点的编号应该是 $2$ ，这里需要特判一下。

那么思路上大体就是这样了。

## 算法流程

![](https://img-blog.csdnimg.cn/img_convert/28451ac8df50fdf118a3de738e5ce8cf.png)

## 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;
inline int read(){
	int s = 0, w = 1;
	char ch = getchar();
	for(; ch < '0' || ch > '9'; w *= (ch == '-') ? -1 : 1, ch = getchar());
	for(; ch >= '0' && ch <= '9'; s = 10 * s + ch - '0', ch = getchar());
	return s * w;
}
const int MAXN = 1005;
bool G[MAXN][MAXN];
void add(int u, int v){
	G[u][v] = G[v][u] = 1;
}
signed main(){
	int k = read(), s = log2(k);
	add(1, 3), add(1, 4);
	for(int i = 1; i <= s; i++){
		add(i * 2 + 1, i * 2 + 3);
		add(i * 2 + 1, i * 2 + 4);
		add(i * 2 + 2, i * 2 + 3);
		add(i * 2 + 2, i * 2 + 4);
	}
	for(int i = 1; i <= s; i++){
		add(2 * s + 4 + i, 2 * s + i + 5);
	}
	add(3 * s + 4, 2);
	for(int i = 0; i <= s; i++){
		if((k & (1 << i)) == 0) continue;
		if(i == s) add(2 * i + 4, 2);
		else add(2 * i + 4, 2 * s + i + 5);
	}
	cout << 3 * s + 4 << endl;
	for(int i = 1; i <= 3 * s + 4; i++){
		for(int j = 1; j <= 3 * s + 4; j++){
			cout << (G[i][j] ? "Y" : "N");
		}
		puts("");
	}
	return 0;
}
```

制作不易，顺手点个赞吧。