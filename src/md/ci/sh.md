```bash
- name: Deploy to GitHub Pages
        uses: chendj001/githubPushAction@master
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为Vite项目的默认输出目录
          build_dir: ./dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
