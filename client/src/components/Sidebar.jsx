import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div>
            <div class="d-flex align-items-start">
                <div
                    class="nav flex-column nav-pills me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <button
                        class="nav-link active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="div"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                    >
                        <Link to="/profileOrg">My Profile</Link>
                    </button>
                    <button
                        class="nav-link"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="div"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                    >
                        <Link to="/managePostings">Manage Postings</Link>
                    </button>
                    <button
                        class="nav-link"
                        id="v-pills-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-disabled"
                        type="div"
                        role="tab"
                        aria-controls="v-pills-disabled"
                        aria-selected="false"
                        disabled
                    >
                        <Link to="applications">Applications</Link>
                    </button>
                    {/* <div class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="div" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</div>
                    <div class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="div" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</div> */}
                </div>
                <div class="tab-content" id="v-pills-tabContent">
                    <div
                        class="tab-pane fade show active"
                        id="v-pills-home"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                        tabindex="0"
                    >
                        ...
                    </div>
                    <div
                        class="tab-pane fade"
                        id="v-pills-profile"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                        tabindex="0"
                    >
                        ...
                    </div>
                    <div
                        class="tab-pane fade"
                        id="v-pills-disabled"
                        role="tabpanel"
                        aria-labelledby="v-pills-disabled-tab"
                        tabindex="0"
                    >
                        ...
                    </div>
                    <div
                        class="tab-pane fade"
                        id="v-pills-messages"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                        tabindex="0"
                    >
                        ...
                    </div>
                    <div
                        class="tab-pane fade"
                        id="v-pills-settings"
                        role="tabpanel"
                        aria-labelledby="v-pills-settings-tab"
                        tabindex="0"
                    >
                        ...
                    </div>
                </div>
            </div>
        </div>
    );
}
