
use axum::Router;
use axum::routing::post;

use crate::controllers::{email_change, reset_password, contact_from_admin, contact_from_user, new_account_message};

pub fn mailer_router() -> Router {

    Router::new()

        .route("/email-change", post(email_change)

        )
        .route("/reset-password", post(reset_password)

        )
        .route("/messages/from-admin", post(contact_from_admin)

        )
        .route("/messages/from-user", post(contact_from_user)

        )
        .route("/new-account", post(new_account_message)

        )                
}