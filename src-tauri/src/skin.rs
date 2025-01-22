use serde::{ser::Serializer, Serialize};
use std::fs::File;
use std::path::PathBuf;
use tauri::command;
use std::os::windows::process::CommandExt;

type Result<T> = std::result::Result<T, Error>;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Zip(#[from] zip_extract::ZipExtractError),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[command]
pub async fn reset_skin() -> Result<()> {
    let has_champions = std::path::Path::new("profiles").exists();
    if has_champions {
        std::fs::remove_dir_all("profiles")?;
    }
    std::fs::create_dir("profiles")?;
    Ok(())
}

#[command]
pub async fn unzip_skin(src_zip: &str, game_path: &str) -> Result<String> {
    let target_dir = PathBuf::from("temp");
    let file = File::open(src_zip)?;
    zip_extract::extract(file, &target_dir, true)?;
    let mut command = std::process::Command::new("mod-tools.exe");
    command
        .arg("mkoverlay")
        .arg("./")
        .arg("profiles")
        .arg(format!("--game:{}", game_path))
        .arg("--mods:temp")
        .creation_flags(0x08000000)
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::null());

    command.output()?;

    std::fs::remove_dir_all(target_dir)?;
    Ok("Extracted".to_string())
}
