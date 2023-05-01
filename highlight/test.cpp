#include <bits/stdc++.h>
#define int long long
using namespace std;
inline int read(){
	int s = 0, w = 1;
	char ch = getchar();
	for(; ch < '0' || ch > '9'; w *= ch == '-' ? -1 : 1, ch = getchar());
	for(; ch >= '0' && ch <= '9'; s = s * 10 + ch - '0', ch = getchar());
	return s * w;
}
const int MAXN = 100005;
const int MAXM = 100005;
struct Graph{
	struct Edge{
		int to, nxt;
	} e[MAXM];
	int head[MAXN], tot;
	void add(int u, int v){
		e[++tot].to = v;
		e[tot].nxt = head[u];
		head[u] = tot;
	}
} G;
struct Node{
	int id, w;
	bool operator < (const Node &rhs) const {
		return w > rhs.w;
	}
} a[MAXN];
int N, M, res[MAXN], tot;
void dfs(int u, int w){
	tot++;
	res[u] = w;
	for(int i = G.head[u], v; i; i = G.e[i].nxt){
		v = G.e[i].to;
		if(res[v]) continue;
		dfs(v, w);
	}
}
signed main(){
	freopen("treasure.in", "r", stdin);
	freopen("treasure.out", "w", stdout);
	N = read(), M = read();
	for(int i = 1; i <= N; i++){
		a[i].id = i, a[i].w = read();
	}
	sort(a + 1, a + N + 1);
	for(int i = 1, u, v; i <= M; i++){
		u = read(), v = read();
		G.add(v, u);
	}
	for(int i = 1; i <= N; i++){
		if(tot == N) break;
		if(res[a[i].id]) continue;
		dfs(a[i].id, a[i].w);
	}
	for(int i = 1; i <= N; i++){
		cout << res[i] << " ";
	}
	return 0;
}
