# CLAUDE.md

このファイルはClaude Codeがこのリポジトリで作業する際のガイドラインを定義します。

## プロジェクト概要

タスクボードアプリケーション。テキスト入力でタスクを追加・完了切り替え・削除でき、localStorageに永続化する。

## デプロイ先

https://koyahyrock.github.io/task-board/

`main` ブランチへのプッシュで GitHub Actions が自動ビルド・デプロイする。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| UIライブラリ | React 19 |
| ビルドツール | Vite 8 |
| 言語 | JavaScript (JSX) |
| スタイリング | CSS（CSS変数、ネストCSS） |
| 状態管理 | React `useState` / `useEffect` |
| 永続化 | `localStorage` |
| デプロイ | GitHub Actions → GitHub Pages |

## コンポーネント命名規約

- **ファイル名・コンポーネント名** はPascalCase（例: `TaskItem.jsx`, `TaskList.jsx`）
- **CSSクラス名** はkebab-case（例: `.task-item`, `.add-btn`, `.delete-btn`）
- **イベントハンドラ** は `handle` プレフィックス（例: `handleKeyDown`, `handleSubmit`）
- **真偽値の状態・props** は `is` / `has` プレフィックス（例: `isCompleted`, `hasError`）
- **localStorageキー** は `STORAGE_KEY` 定数で一元管理

## ディレクトリ構成

```
src/
  App.jsx        # ルートコンポーネント・状態管理
  App.css        # App固有スタイル
  index.css      # グローバルスタイル（CSS変数定義含む）
  main.jsx       # エントリーポイント
  assets/        # 静的アセット
.github/
  workflows/
    deploy.yml   # GitHub Pages 自動デプロイ
```

## 開発コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 本番ビルド
npm run preview  # ビルド結果のプレビュー
```

## Git 運用ルール

### 基本方針

- **コードを変更するたびに、必ずGitHubにプッシュする。**
- 作業単位ごとにコミットを作成し、その都度 `git push` でリモートに反映する。
- mainブランチへの直接プッシュは小規模な修正のみ許可。機能追加・大きな変更はfeatureブランチを使う。

### コミットの作り方

1. 変更が論理的にまとまった時点でコミットする（動作する状態を保つ）
2. コミットメッセージは日本語または英語どちらでもよいが、変更内容を端的に表す
3. コミット後は必ず `git push` を実行する

```bash
git add <変更ファイル>
git commit -m "変更内容の要約"
git push
```

### ブランチ戦略

- `main` — 常にデプロイ可能な状態を維持
- `feature/<機能名>` — 新機能開発
- `fix/<バグ名>` — バグ修正

### プッシュの確認

- プッシュ前に `git status` と `git diff` で変更内容を確認する
- 機密情報（.env、APIキーなど）を含むファイルは絶対にコミットしない

## コーディング規約

- コメントは原則書かない。コードが自明でない場合のみ「なぜ」を記述する
- 不要な抽象化・将来の要件のための設計はしない
- セキュリティ脆弱性（XSS、SQLインジェクション等）に注意する
