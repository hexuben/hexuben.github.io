# [ARC112E] E - Cigar Box 题解

## 题目大意

给定 $1\sim n$ 的排列 $P$，并给定 $m$，要求在 $m$ 次操作以内将排列 $P$ 还原为 $1\sim n$ 的升序排列（即 $1,2,\cdots,n$）。

一次操作是指：将排列中的任意一个数移到第一个或移到最后一个。

+ $2\leqslant n\leqslant 3000$
+ $1\leqslant m\leqslant 3000$

## 分析

动态规划。

首先有一条性质，就是说对于一个数 $x$ 的所有操作中，只有最后一个操作才是有效的，其他操作对于还原都是无效的。显然，任意一个数有且仅有一个与它对应的有效操作。

假设操作序列 $M$ 能使得题目给定的排列还原，就可以设 $f_{i,j}$ 表示满足序列的**后** $i$ 项中有 $j$ 个有效操作的序列数。假设$[$操作 $M_i$ 是有效的$]^{(1)}$，那么方案数就是 $f_{i-1,j-1}$；如果操作 $M_i$ 是无效的，那么方案数是 $f_{i-1,j}$，但又因为还要考虑这个操作和哪一个操作冲突了（后面哪一个操作移动了这个数），所以还要乘 $(i-1)$。所以，可以得出转移方程 $f_{i,j}=f_{i-1,j-1}+(i-1)f_{i-1,j}$。

最后，统计答案。注意这个转移方程的前提。显然的，在大多数状态下会有一些数没有被操作过。这些数没被操作过到最后依然能够形成 $1\sim n$ 的排列，说明这些数是连续的区间，并且单调递增。可以枚举区间 $[l,r]$，只要区间 $[l,r]$ 满足 $a_l\sim a_r$ 递增就可以将 $f_{l,r}$ 累加到答案中。累加的时候还需考虑操作是移到最前面还是移到最后面。可以用组合数 $C_{i-1+n-j}^{i-1}$ 解决。当然，还要考虑$[$没有递增序列但依然合法的情况$]^{(2)}$。这种情况说明所有操作都有效，那么只需要看操作是移到前面还是移到后面，$[$共 $2^n$ 种情况$]^{(3)}$。

## 注记

这里的注记是给看不懂此题解的同学们看的。

+ $(1)$：“操作有效”的含义就是说这个操作移动的数在后面没有被移动过。由于设计的状态 $f_{i,j}$ 与后 $i$ 项相关，所以 $M_{i+1}\sim M_{m}$ 中没有操作所移动的数跟 $M_i$ 移动的数相等。
+ $(2)$：也就是说所有的数都被移动过了，所以没有递增序列。
+ $(3)$：每个数对应的有效操作有可能是将某个数移至最前面，也有可能是移至最后面，共 $n$ 个数，所以有 $2^n$ 种方法。

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
const int MAXN = 3005;
const int MOD = 998244353;
int n, m, a[MAXN], f[MAXN][MAXN], C[MAXN][MAXN << 1];
signed main(){
	n = read(), m = read();
	for(int i = 1; i <= n; i++) a[i] = read();
	for(int i = 1; i <= n; i++){
		C[i][0] = C[i][i] = 1;
		for(int j = 1; j < i; j++){
			C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
		}
	}
	f[0][0] = 1;
	for(int i = 1; i <= m; i++){
		for(int j = 1; j <= n; j++){
			f[i][j] = (f[i - 1][j - 1] + f[i - 1][j] * 2 * j % MOD) % MOD;
		}
	}
	int res = 0;
	for(int i = 1; i <= n; i++){
		bool flag = false;
		for(int j = i; j <= n; j++){
			if(j > i && a[j] < a[j - 1]) flag = true;
			if(flag) break;
			res = (res + f[m][i - 1 + n - j] * C[i - 1 + n - j][i - 1]) % MOD;
		}
	}
	for(int i = 0; i <= n; i++){
		res = (res + f[m][n] * C[n][i] % MOD) % MOD;
	}
	cout << res << endl;
	return 0;
}
```