import React, { useEffect, useState } from 'react';
import { Skeleton } from '../skeleton/skeleton';
import { User } from '../user/user';

export const Users = ({ onClickSendInvites, invites, setInvites }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // локальное состояние для загрузки
    const [searchValue, setSearchValue] = useState('');// состояние поиска

    useEffect(() => {
        //отправляем запрос fetch('')
        fetch('https://reqres.in/api/users')
            //если ответ будет успешным его преобразовать в json()
            .then((res) => res.json())
            //вытягиваем ответ с json и нужно обьяснить что нам из всего json нужно только json.data
            .then((json) => {
                setUsers(json.data);
                setIsLoading(false);
            })
            .catch((error) => {
                alert('Ошибка при получении пользователя');
            })
    }, []);

    const onChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites(prev =>  [...prev, id]);//если этого пользователя нет то добавляем его в конец массива [...prev, id] 
        }
    }

    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input value={searchValue}
                       onChange={onChangeSearchValue} 
                       type="text" 
                       placeholder="Найти пользователя..." />
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <ul className="users-list">
                    {
                        users.filter(obj => {
                            const fullName = (obj.first_name + obj.last_name).toLowerCase();
                            
                            return fullName.includes(searchValue.toLowerCase());
                        }).map(user => {
                            return (
                                <User key={user.id}
                                      id={user.id}
                                      user={user}
                                      isInvited={invites.includes(user.id)} 
                                      onClickInvite={onClickInvite}  />
                            )
                        })
                    }
                </ul>
            )}
            <button onClick={onClickSendInvites} className="send-invite-btn">Отправить приглашение ({invites.length})</button>
        </>
    );
};
