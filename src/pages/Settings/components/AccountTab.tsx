import React from "react";

const AccountTab = () => {
    return (
        <>
            <div className="account-heading">
                <p>Addresses</p>
                <span>Manage your billing and/or shipping addresses</span>
                <br />
                <span>The following addresses will be used on the checkout page by default.</span>
            </div>
            <div className="account-form"></div>
        </>
    )
}

export default AccountTab;