import React, {useMemo, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Chip,
  ConfirmationModal,
  EmptyStateView,
  GlassCard,
  PrimaryGreenButton,
  Screen,
  ScreenHeader,
  SecondaryGraphiteButton,
  textStyles,
} from '../../../shared/design-system/primitives';
import {CartItemRow, MenuItemCard} from '../../../shared/design-system/guestCards';
import {menuCategories, menuItems} from '../../../domain/resort/menu/menuRegistry';
import {guestMemoryKeys, useGuestMemory} from '../../../shared/persistence/useGuestMemory';
import {palette} from '../../../shared/theme/palette';
import type {CartItem, MenuCategory} from '../../../domain/resort/types';

export function TableSideGuide() {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>('Breakfast');
  const [cart, setCart] = useGuestMemory<CartItem[]>(guestMemoryKeys.cart, []);
  const [cartVisible, setCartVisible] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);

  const filteredItems = useMemo(
    () => menuItems.filter(item => item.category === selectedCategory),
    [selectedCategory],
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, cartItem) => {
    const menuItem = menuItems.find(item => item.id === cartItem.menuItemId);
    return sum + (menuItem?.price ?? 0) * cartItem.quantity;
  }, 0);

  const addToCart = (menuItemId: string) => {
    setCart(current => {
      const existing = current.find(item => item.menuItemId === menuItemId);
      if (existing) {
        return current.map(item =>
          item.menuItemId === menuItemId
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }

      return [...current, {menuItemId, quantity: 1}];
    });
  };

  const increase = (menuItemId: string) => {
    setCart(current =>
      current.map(item =>
        item.menuItemId === menuItemId
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    );
  };

  const decrease = (menuItemId: string) => {
    setCart(current =>
      current
        .map(item =>
          item.menuItemId === menuItemId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const remove = (menuItemId: string) => {
    setCart(current => current.filter(item => item.menuItemId !== menuItemId));
  };

  const submitOrder = () => {
    setCartVisible(false);
    setOrderVisible(true);
  };

  const finishOrder = () => {
    setOrderVisible(false);
    setCart([]);
  };

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <ScreenHeader
            title="Restaurant Menu"
            subtitle="Order food and drinks from your phone."
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => setCartVisible(true)}
          style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
          <Text style={styles.cartCount}>{cartCount}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}>
        {menuCategories.map(category => (
          <Chip
            key={category}
            label={category}
            active={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </ScrollView>
      <View style={styles.menuList}>
        {filteredItems.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAdd={() => addToCart(item.id)}
          />
        ))}
      </View>
      <Modal
        visible={cartVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setCartVisible(false)}>
        <View style={styles.sheetBackdrop}>
          <View style={styles.cartSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Your Cart</Text>
              <TouchableOpacity onPress={() => setCartVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>
            {cart.length === 0 ? (
              <EmptyStateView
                title="Cart is empty"
                message="Add dishes or drinks to prepare your resort order."
              />
            ) : (
              <>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cartList}>
                  {cart.map(cartItem => {
                    const item = menuItems.find(
                      menuItem => menuItem.id === cartItem.menuItemId,
                    );

                    if (!item) {
                      return null;
                    }

                    return (
                      <CartItemRow
                        key={cartItem.menuItemId}
                        cartItem={cartItem}
                        item={item}
                        onIncrease={() => increase(cartItem.menuItemId)}
                        onDecrease={() => decrease(cartItem.menuItemId)}
                        onRemove={() => remove(cartItem.menuItemId)}
                      />
                    );
                  })}
                </ScrollView>
                <GlassCard style={styles.subtotalCard}>
                  <View style={styles.subtotalRow}>
                    <Text style={textStyles.cardTitle}>Subtotal</Text>
                    <Text style={styles.subtotal}>${subtotal.toFixed(2)}</Text>
                  </View>
                  <PrimaryGreenButton title="Submit Order" onPress={submitOrder} />
                  <SecondaryGraphiteButton
                    title="Continue Browsing"
                    onPress={() => setCartVisible(false)}
                    style={styles.continueButton}
                  />
                </GlassCard>
              </>
            )}
          </View>
        </View>
      </Modal>
      <ConfirmationModal
        visible={orderVisible}
        title="Order Submitted"
        message="Your restaurant order has been sent to the resort team. You can continue exploring services while it is prepared."
        primaryLabel="Done"
        secondaryLabel="Keep Cart"
        onPrimary={finishOrder}
        onClose={() => setOrderVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerCopy: {
    flex: 1,
  },
  cartButton: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: palette.greenGlass,
    borderWidth: 1,
    borderColor: palette.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    fontSize: 22,
  },
  cartCount: {
    position: 'absolute',
    right: 8,
    top: 6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: palette.emerald,
    color: palette.background,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 20,
  },
  chips: {
    paddingBottom: 16,
  },
  menuList: {
    marginTop: 2,
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  cartSheet: {
    maxHeight: '86%',
    backgroundColor: palette.darkCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 138, 0.18)',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: palette.divider,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sheetTitle: {
    color: palette.textPrimary,
    fontSize: 24,
    fontWeight: '900',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.graphite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: palette.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  cartList: {
    maxHeight: 360,
  },
  subtotalCard: {
    padding: 14,
    marginTop: 14,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  subtotal: {
    color: palette.emerald,
    fontSize: 22,
    fontWeight: '900',
  },
  continueButton: {
    marginTop: 10,
  },
});
