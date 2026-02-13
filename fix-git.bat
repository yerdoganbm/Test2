@echo off
REM Git Ayarlarini Duzelt - Vim Editorunu Kapat

echo ====================================
echo Git Ayarlari Duzeltiliyor...
echo ====================================
echo.

cd C:\Users\YUNUS\Desktop\neonia\halisaha-ios

REM Swap dosyasini sil
if exist .git\.MERGE_MSG.swp (
    del .git\.MERGE_MSG.swp
    echo [OK] Swap dosyasi silindi
)

REM Merge'i iptal et
git merge --abort 2>nul

REM Git editoru kapat
git config --global core.editor "echo"
git config --global merge.tool "echo"

echo.
echo [OK] Git ayarlari duzeltildi
echo [OK] Artik Vim editoru acilmayacak
echo.

REM En son kodu cek
git pull --no-edit

echo.
echo ====================================
echo TAMAMLANDI!
echo ====================================
echo.
echo Simdi "npx expo start" komutunu calistirin
echo.
pause
