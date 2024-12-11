import React, { useState } from 'react';
import '../style/index.scss';
import { Success } from '../success/success';
import { Users } from '../users/users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [success, setSuccess] = useState(false); // состояние результата
    const [invites, setInvites] = useState([]); // состояние приглашения

    const onClickSendInvites = () => {
        setSuccess(true);
    }

    return (
        <div className="App">
            {
                success ? (
                    <Success count={invites.length} />
                ) : (
                    <Users invites={invites} setInvites={setInvites} onClickSendInvites={onClickSendInvites} />
                )
            }
        </div>
    );
}

export default App;
