#!/usr/bin/env bash
# ============================================================================
# scripts/tonghop.sh — Gộp toàn bộ session git về 1 nguồn + đẩy lên git
#
# CÁCH DÙNG:
#   scripts/tonghop.sh                 → gộp hết + đẩy lên origin/master (mặc định)
#   scripts/tonghop.sh <nhánh>         → gộp hết + đẩy lên origin/<nhánh> (VD: main)
#   scripts/tonghop.sh --ask           → hỏi nhánh muốn đẩy lên trước khi đẩy
#   scripts/tonghop.sh -h              → xem help
#
# Để chỉ cần gõ "tổng hợp" là chạy, thêm vào ~/.zshrc / ~/.bashrc:
#   alias tổng='bash <ĐƯỜNG_DẪN_REPO>/scripts/tonghop.sh'
#   → gõ: tổng hợp   hoặc   tổng
#   (hoặc: alias tonghop='bash <ĐƯỜNG_DẪN_REPO>/scripts/tonghop.sh' → gõ: tonghop)
#
# XUNG ĐỘT: merge tự động; nếu cả 2 bên sửa cùng 1 file khác nhau → session đó bị
# bỏ qua (repo không bị phá), ghi ở tổng kết cuối để xử tay. Đặt
#   TONGHOP_AUTO=theirs scripts/tonghop.sh
# để tự ưu tiên phiên bản session khi có xung đột.
# ============================================================================
set -euo pipefail

ARTIFACTS=".impeccable/hook.cache.json"
COAUTH="Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"

cyan='\033[36m'; green='\033[32m'; yellow='\033[33m'; red='\033[31m'; off='\033[0m'
info() { echo -e "${cyan}▸ $1${off}"; }
ok()   { echo -e "${green}✓ $1${off}"; }
warn() { echo -e "${yellow}! $1${off}"; }
err()  { echo -e "${red}✗ $1${off}" >&2; }

# ------------------------------------------------------------------- nhánh đích
PUSH_TARGET="master"
ASK=0
for a in "$@"; do
  case "$a" in
    hợp|tổng) ;;                       # để "tổng hợp" (alias tổng=...) chạy được
    --ask) ASK=1 ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) PUSH_TARGET="$a" ;;
  esac
done

SYNC_BRANCH="$(git branch --show-current)"
if [ -z "$SYNC_BRANCH" ]; then SYNC_BRANCH="$(git rev-parse --short HEAD)"; fi

if [ "$ASK" = 1 ]; then
  if [ -t 0 ]; then
    printf "Nhánh muốn đẩy lên [master]: "
    if read -r t; then :; fi
    if [ -n "${t:-}" ]; then PUSH_TARGET="$t"; fi
  else
    warn "--ask nhưng không có TTY → đẩy lên master"
  fi
fi

# ----------------------------------------------------------------------- 1. fetch
info "1/7 Fetch origin"
git fetch origin --prune

# ---------------------------------------------------------------- 2. căn chỉnh
info "2/7 Căn chỉnh $SYNC_BRANCH với origin/$PUSH_TARGET"
if git merge --ff-only "origin/$PUSH_TARGET" >/dev/null 2>&1; then :; else
  if git merge "origin/$PUSH_TARGET" -m "Merge origin/$PUSH_TARGET vào $SYNC_BRANCH

$COAUTH" >/dev/null 2>&1; then
    ok "Đã merge origin/$PUSH_TARGET"
  else
    git merge --abort >/dev/null 2>&1 || true
    err "origin/$PUSH_TARGET xung đột với $SYNC_BRANCH — cần xử tay"
    exit 1
  fi
fi

# ---------------------------------------------------------------- 3. commit phần chưa commit
info "3/7 Commit phần chưa commit ở các session"
CURWT="$(git rev-parse --show-toplevel)"

dirty="$(git status --porcelain | grep -vF "$ARTIFACTS" || true)"
if [ -n "$dirty" ]; then
  git add -A
  if git commit -m "Session work from $SYNC_BRANCH

$COAUTH" -- . ":(exclude)$ARTIFACTS" >/dev/null 2>&1; then
    ok "Đã commit phần chưa commit: $SYNC_BRANCH"
  else
    warn "$SYNC_BRANCH chỉ có artifact session-local → bỏ qua"
  fi
fi

WTS=()
while IFS= read -r line; do WTS+=("$line"); done < <(git worktree list --porcelain | sed -n 's/^worktree //p')

if [ "${#WTS[@]}" -gt 0 ]; then
  for wt in "${WTS[@]}"; do
    if [ "$wt" = "$CURWT" ]; then continue; fi
    branch="$(git -C "$wt" branch --show-current)"
    if [ -z "$branch" ]; then
      warn "Session $(basename "$wt") detached HEAD → bỏ qua auto-commit"
      continue
    fi
    sdirty="$(git -C "$wt" status --porcelain | grep -vF "$ARTIFACTS" || true)"
    if [ -n "$sdirty" ]; then
      git -C "$wt" add -A
      if git -C "$wt" commit -m "Session work from $branch

$COAUTH" -- . ":(exclude)$ARTIFACTS" >/dev/null 2>&1; then
        ok "Đã commit phần chưa commit: $branch"
      else
        warn "$branch chỉ có artifact session-local → bỏ qua"
      fi
    fi
  done
fi

# ---------------------------------------------------------------- 4. merge toàn bộ session
info "4/7 Gộp toàn bộ nhánh session vào $SYNC_BRANCH"
MERGED=()
CONFLICTS=()

BRANCHES=()
while IFS= read -r line; do BRANCHES+=("$line"); done < <(git for-each-ref --format='%(refname:short)' 'refs/heads/anhluufromvietnam-*')
while IFS= read -r line; do BRANCHES+=("$line"); done < <(git for-each-ref --format='%(refname:short)' 'refs/remotes/origin/anhluufromvietnam-*')

if [ "${#BRANCHES[@]}" -gt 0 ]; then
  for b in "${BRANCHES[@]}"; do
    if [ "$b" = "$SYNC_BRANCH" ]; then continue; fi
    if git merge-base --is-ancestor "$b" HEAD >/dev/null 2>&1; then continue; fi
    if git merge --no-ff "$b" -m "Merge $b vào tổng hợp

$COAUTH" >/dev/null 2>&1; then
      MERGED+=("$b")
      ok "Đã gộp $b"
    elif [ "${TONGHOP_AUTO:-}" = "theirs" ]; then
      git checkout --theirs . >/dev/null 2>&1 || true
      git add -A
      git commit --allow-empty -m "Resolve xung đột $b (ưu tiên phiên bản session)

$COAUTH" >/dev/null 2>&1 || true
      MERGED+=("$b")
      ok "Đã gộp $b (theirs)"
    else
      git merge --abort >/dev/null 2>&1 || true
      CONFLICTS+=("$b")
      warn "Xung đột khi gộp $b — bỏ qua, cần xử tay"
    fi
  done
fi

# ---------------------------------------------------------------- 5. build kiểm tra
if [ -f package.json ] && grep -q '"build"' package.json; then
  info "5/7 Build kiểm tra"
  if npm run build >/tmp/tonghop-build.log 2>&1; then
    ok "Build pass"
  else
    err "Build fail:"
    tail -15 /tmp/tonghop-build.log
    exit 1
  fi
fi

# ---------------------------------------------------------------- 6. đẩy lên
info "6/7 Đẩy $SYNC_BRANCH lên origin/$PUSH_TARGET"
if git push origin "$SYNC_BRANCH:$PUSH_TARGET" 2>&1 | sed 's/^/    /'; then
  ok "Đã đẩy lên origin/$PUSH_TARGET"
else
  err "Push thất bại — kiểm tra quyền / remote"
  exit 1
fi

# ---------------------------------------------------------------- 7. cập nhật session
info "7/7 Cập nhật toàn bộ session worktree"
if [ "${#WTS[@]}" -gt 0 ]; then
  for wt in "${WTS[@]}"; do
    if [ "$wt" = "$CURWT" ]; then continue; fi
    branch="$(git -C "$wt" branch --show-current)"
    if [ -z "$branch" ]; then
      warn "$(basename "$wt") detached → không cập nhật"
      continue
    fi
    if git -C "$wt" merge --ff-only "origin/$PUSH_TARGET" >/dev/null 2>&1; then
      ok "Đã cập nhật $branch → $(git -C "$wt" log --oneline -1)"
    else
      warn "$branch không ff được (đã đi trước) → cần xử tay"
    fi
  done
fi

# ---------------------------------------------------------------- tổng kết
echo ""
ok "TỔNG HỢP XONG → origin/$PUSH_TARGET @ $(git rev-parse --short HEAD)"
if [ "${#CONFLICTS[@]}" -gt 0 ]; then
  warn "Session có xung đột cần xử tay: ${CONFLICTS[*]}"
fi
info "Chạy lại bất cứ lúc nào: bash scripts/tonghop.sh"
info "Để gõ 'tổng hợp' là chạy:  alias tổng='bash $(git rev-parse --show-toplevel)/scripts/tonghop.sh'"
