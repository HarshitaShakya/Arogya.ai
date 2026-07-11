$files = git status -uall --porcelain
foreach ($line in $files) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $status = $line.Substring(0, 2)
    $file = $line.Substring(3)
    if ($file -match '^".*"$') {
        $file = $file.Trim('"')
    }
    
    if ($file -match "__pycache__" -or $file -match "node_modules" -or $file -match "\.env$") { continue }
    
    $filename = Split-Path $file -Leaf
    if ([string]::IsNullOrEmpty($filename)) { $filename = $file }
    
    if ($status -match 'D') {
        $msg = "Remove $filename"
    } elseif ($status -match 'M') {
        $msg = "Update $filename"
    } else {
        $msg = "Add $filename"
    }
    
    git add --all "$file"
    git commit -m $msg
}
