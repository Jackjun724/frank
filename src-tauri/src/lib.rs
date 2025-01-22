mod lcu;
mod shaco;
mod skin;
use lcu::{
    get_match_list, init_keyboard, invoke_lcu, is_game_start, is_lol_cilent,
    listen_for_client_start, start_champ_select, start_current_champ_select, start_listener,
};
use skin::unzip_skin;
use tauri_plugin_shell::ShellExt;

#[tokio::main]
pub async fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            is_lol_cilent,
            start_listener,
            start_champ_select,
            invoke_lcu,
            get_match_list,
            is_game_start,
            init_keyboard,
            listen_for_client_start,
            start_current_champ_select,
            unzip_skin
        ])
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_process::init())
        .setup(|app| {
            app.shell()
                .sidecar("Hermes.exe")
                .unwrap()
                .spawn()
                .expect("Failed to spawn sidecar");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
