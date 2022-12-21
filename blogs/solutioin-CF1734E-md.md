# CF1734E Rectangular Congruence 题解

## 题目大意

给定一个质数 $n$（$n \leq 350$），你要构造出 $n\times n$ 的矩阵。其中，矩阵的左上-右下对角线已经给出，你要使得这个矩阵中所有的数都在 $[0,n-1]$ 的范围内，同时满足任意一个矩形中两条对角线顶点上的数之和在模 $n$ 意义下同余。

## 分析

用题目中的式子表示，就是说对于任意的 $r_1,r_2,c_1,c_2\in[0,n-1]$，满足 $a_{r_1,c_1}+a_{r_2,c_2}\not\equiv a_{r_1,c_2}+a_{r_2,c_1}\pmod n$.看到这种东西，我们最好希望它们变简单一点，每一边的共同因素多一点。我们就可以移项，变成如下形式：
$$a_{r_1,c_1}-a_{r_1,c_2}\not\equiv a_{r_2,c_1}-a_{r_2,c_2}\pmod n$$

这时候就可以发挥构造的超长特点：肆意控制变量或不变量。
我们只要让 $c_1,c_2$ 相同的时候两边不等即可。显然，构造一个等差数列即可。令第 $i$ 行的公差为 $i-1$，这样就能满足条件。

## 结论

只要使得第 $i$ 行的公差为 $i-1$ 即可。利用这个结论，我们可以退出公式 $a_{i,j}=(i-j)(i-1)+b_i$，其中 $b_i$ 为题目中给定，还要注意一下**取模**。

## 代码
```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;
inline int read(){
	int s = 0, w = 1;
	char ch = getchar();
	for(; ch < '0' || ch > '9'; w *= ch == '-' ? -1 : 1, ch = getchar());
	for(; ch >= '0' && ch <= '9'; s = 10 * s + ch - '0', ch = getchar());
	return s * w;
}
const int MAXN = 355;
int n, a[MAXN];
signed main(){
	n = read();
	for(int i = 1; i <= n; i++) a[i] = read();
	for(int i = 1; i <= n; i++){
		for(int j = 1; j <= n; j++){
			cout << (((j - i) * (i - 1) + a[i]) % n + n) % n << " ";
		}
		cout << endl;
	}
	return 0;
}
```