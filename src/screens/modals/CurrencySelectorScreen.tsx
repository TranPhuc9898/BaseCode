import React, { FC, useEffect, useState } from 'react';
import {
    FlatList,
    SectionList,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';
import { find, get } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-ico-flags';

import i18n, { L } from '@stdio/constants/langs';
import { ICurrency } from '@stdio/configs/custom-types';
import { FormInput, FormText, ModalHeader } from '@stdio/components/forms';
import { Colors } from '@stdio/constants/Colors';
import { ModalStackScreenProps } from '@stdio/navigation/RootStackNavigator/ModalStackNavigator';
import { CustomStorage } from '@stdio/core/libs/custom-storage';

export type TCurrencySelector = 'from' | 'to';

export const getCurrencyByCode = (currencies: ICurrency[], code: string) => {
    const newCurrency = find(currencies, { code });
    return newCurrency === undefined ? currencies[0] : newCurrency;
};

export const FlagIcon: FC<{ currency: ICurrency }> = ({ currency }) => {
    const code = get(currency, 'code', '');
    const icon = get(currency, 'icon', '');

    if (code === '') return <MaterialCommunityIcons name="cash" size={32} color="#fff" />;

    if (code === 'BTC')
        return <MaterialCommunityIcons name="bitcoin" size={32} color={Colors.main} />;
    else if (code === 'XAG') return <MaterialCommunityIcons name="gold" size={32} color="#fff" />;
    else if (code === 'XAU')
        return <MaterialCommunityIcons name="gold" size={32} color={Colors.main} />;
    else if (['GYD', 'SHP', 'SZL', 'XDR', 'UZS'].includes(code))
        return (
            <View
                style={{
                    width: 30,
                    height: 20,
                    backgroundColor: '#f60',
                    justifyContent: 'center',
                    marginHorizontal: 1,
                }}
            >
                <FormText
                    style={{
                        width: '100%',
                        color: '#fff',
                        fontSize: 11,
                        textAlign: 'center',
                    }}
                >
                    {code}
                </FormText>
            </View>
        );
    else return <Icon name={icon} width={30} height={30} />;
};

export default function CurrencySelectorScreen(
    modalStackNavigator: ModalStackScreenProps<'CurrencySelectorScreen'>
) {
    const { type, currencies, onSelect } = modalStackNavigator.route.params;

    const [recentlyCurrencies, setRecentlyCurrencies] = useState<ICurrency[]>([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchCurrencies, setSearchCurrencies] = useState<ICurrency[]>([]);

    const [selectedCurrency, setSelectedCurrency] = useState<ICurrency | null>(null);

    useEffect(() => {
        const init = async () => {
            if (type === 'from') {
                const srcCode = CustomStorage.CurrencyCode.get('srcCode');
                if (srcCode !== null) setSelectedCurrency(getCurrencyByCode(currencies, srcCode));
                else {
                    setSelectedCurrency(currencies[0]);
                    await CustomStorage.CurrencyCode.set('srcCode', currencies[0].code);
                }
            } else if (type === 'to') {
                const desCode = CustomStorage.CurrencyCode.get('desCode');
                if (desCode !== null) setSelectedCurrency(getCurrencyByCode(currencies, desCode));
                else {
                    setSelectedCurrency(currencies[0]);
                    await CustomStorage.CurrencyCode.set('desCode', currencies[0].code);
                }
            }

            const recentlyCurrencyCodes = CustomStorage.RecentlyCurrencyCodes.get();
            if (recentlyCurrencies)
                setRecentlyCurrencies(
                    currencies.filter((c) => recentlyCurrencyCodes.includes(c.code))
                );
        };

        init();
    }, [type]);

    useEffect(() => {
        const newSearchCurrencies = currencies.filter(
            (c) =>
                c.code.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
                c.currency.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
        );

        setSearchCurrencies(newSearchCurrencies);
    }, [searchTerm]);

    const Item: FC<{ currency: ICurrency }> = ({ currency }) => (
        <TouchableHighlight
            style={styles.itemContainer}
            onPress={async () => {
                await CustomStorage.CurrencyCode.set(
                    type === 'from' ? 'srcCode' : 'desCode',
                    currency.code
                );

                await CustomStorage.RecentlyCurrencyCodes.update();

                onSelect(currency.code);
                modalStackNavigator.navigation.pop();
            }}
            underlayColor="rgba(255, 255, 255, 0.3)"
        >
            <>
                <View style={styles.itemFlag}>
                    <FlagIcon currency={currency} />
                </View>
                <View style={styles.itemContent}>
                    <FormText style={styles.itemName}>{currency.code}</FormText>
                    <FormText style={styles.itemDetail}>{currency.currency}</FormText>
                </View>
                <View style={styles.itemStatus}>
                    {currency.code === selectedCurrency?.code && (
                        <MaterialCommunityIcons name="check-bold" size={24} color="#fff" />
                    )}
                </View>
            </>
        </TouchableHighlight>
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <ModalHeader
                center={type === 'from' ? i18n.t(L.ConvertFrom) : i18n.t(L.ConvertTo)}
                right={
                    <IconButton
                        icon="close"
                        color={Colors.text}
                        onPress={async () => {
                            modalStackNavigator.navigation.pop();
                        }}
                    />
                }
            />
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="text-search" color={Colors.text} size={24} />
                <TextInput
                    style={styles.searchInput}
                    placeholder={i18n.t(L.SearchHint)}
                    placeholderTextColor="#555"
                    clearButtonMode="always"
                    onChangeText={(text) => {
                        setSearchTerm(text);
                    }}
                />
            </View>
            {searchTerm.length > 0 ? (
                <FlatList
                    data={searchCurrencies}
                    renderItem={({ item }) => <Item currency={item} />}
                    keyExtractor={(item, i) => item.code + i}
                />
            ) : (
                <SectionList
                    stickySectionHeadersEnabled={true}
                    sections={[
                        {
                            title: i18n.t(L.RecentCurrencies),
                            data: recentlyCurrencies,
                        },
                        { title: i18n.t(L.AllCurrencies), data: currencies },
                    ]}
                    renderSectionHeader={({ section }) => (
                        <FormText style={styles.sectionHeader}>{section.title}</FormText>
                    )}
                    renderItem={({ item }) => <Item currency={item} />}
                    keyExtractor={(item, i) => item.code + i}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 20,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        borderTopWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 55,
        color: '#fff',
        marginLeft: 10,
        fontSize: 18,
    },
    sectionHeader: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: '#fff',
        backgroundColor: '#333',
    },
    itemContainer: {
        height: 50,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemFlag: {
        width: 32,
        height: 50,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        flexDirection: 'column',
    },
    itemName: {
        color: '#fff',
        alignContent: 'flex-end',
    },
    itemDetail: {
        color: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'flex-start',
    },
    itemStatus: {
        width: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
