# Stitch Dosyalarını Toplama Script'i
# PowerShell Script - Windows

Write-Host "==================================" -ForegroundColor Green
Write-Host "Stitch Dosyalarini Toplama Araci" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

# Kaynak ve hedef klasörler
$sourceFolder = "C:\Users\YUNUS\Downloads\stitch_match_details_roster"
$destFolder = "C:\Users\YUNUS\Downloads\stitch_all_designs"

# Hedef klasörü oluştur
if (!(Test-Path $destFolder)) {
    New-Item -ItemType Directory -Path $destFolder | Out-Null
    Write-Host "✓ Hedef klasor olusturuldu: $destFolder" -ForegroundColor Green
}

# Alt klasörleri tara
$folders = Get-ChildItem -Path $sourceFolder -Directory
$totalFiles = 0

Write-Host ""
Write-Host "Dosyalar kopyalaniyor..." -ForegroundColor Yellow
Write-Host ""

foreach ($folder in $folders) {
    $folderName = $folder.Name
    
    # code.html dosyası
    $codeFile = Join-Path $folder.FullName "code.html"
    if (Test-Path $codeFile) {
        $newName = "$folderName-code.html"
        Copy-Item $codeFile -Destination (Join-Path $destFolder $newName)
        Write-Host "  ✓ $newName" -ForegroundColor Cyan
        $totalFiles++
    }
    
    # screen.png dosyası
    $screenFile = Join-Path $folder.FullName "screen.png"
    if (Test-Path $screenFile) {
        $newName = "$folderName-screen.png"
        Copy-Item $screenFile -Destination (Join-Path $destFolder $newName)
        Write-Host "  ✓ $newName" -ForegroundColor Cyan
        $totalFiles++
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "TAMAMLANDI!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Toplam $totalFiles dosya kopyalandi" -ForegroundColor Yellow
Write-Host "Hedef: $destFolder" -ForegroundColor Yellow
Write-Host ""
Write-Host "Klasoru acmak icin Enter'a basin..."
Read-Host
Start-Process $destFolder
