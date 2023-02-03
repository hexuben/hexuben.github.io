#include <bits/stdc++.h>
//#define int long long
using namespace std;
inline int read(){
	int s = 0, w = 1;
	char ch = getchar();
	for(; ch < '0' || ch > '9'; w *= ch == '-' ? -1 : 1, ch = getchar());
	for(; ch >= '0' && ch <= '9'; s = 10 * s + ch - '0', ch = getchar());
	return s * w;
}
const int MAXN = 3000005;
int CharToInt(char c){
	if(c >= 'a' && c <= 'z') return c - 'a' + 1;
	if(c >= 'A' && c <= 'Z') return c - 'A' + 27;
	if(c >= '0' && c <= '9') return c - '0' + 53;
	return -1;
}
int N, Q, trie[MAXN][63], cnt[MAXN], tot;
void add(string s){
	int p = 0;
	for(int i = 0, tmp; i < s.size(); i++){
		tmp = CharToInt(s[i]);
		if(trie[p][tmp] == 0){
			trie[p][tmp] = ++tot;
		}
		p = trie[p][tmp];
		cnt[p]++;
	}
}
int query(string s){
	int p = 0;
	for(int i = 0, tmp; i < s.size(); i++){
		tmp = CharToInt(s[i]);
		if(trie[p][tmp] == 0){
			return 0;
		}
		p = trie[p][tmp];
	}
	return cnt[p];
}
signed main(){
	ios::sync_with_stdio(false);
	int T;
	cin >> T;
	while(T--){
		cin >> N >> Q;
		for(int i = 0; i <= tot; i++) cnt[i] = 0;
		for(int i = 0; i <= tot; i++){
			for(int j = 0; j <= 62; j++){
				trie[i][j] = 0;
			}
		}
		tot = 0;
		string s;
		for(int i = 1; i <= N; i++){
			cin >> s;
			add(s);
		}
		for(int i = 1; i <= Q; i++){
			cin >> s;
			cout << query(s) << endl;
		}
	}
	return 0;
}
