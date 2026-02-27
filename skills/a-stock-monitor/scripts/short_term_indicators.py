#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
短线技术指标计算模块
"""

import pandas as pd
import numpy as np


class ShortTermIndicators:
    """短线技术指标计算"""
    
    @staticmethod
    def calc_rsi(df: pd.DataFrame, period: int = 14) -> pd.Series:
        """计算RSI指标"""
        delta = df['close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi
    
    @staticmethod
    def calc_kdj(df: pd.DataFrame, n: int = 9, m1: int = 3, m2: int = 3):
        """计算KDJ指标"""
        low_list = df['low'].rolling(window=n, min_periods=n).min()
        high_list = df['high'].rolling(window=n, min_periods=n).max()
        rsv = (df['close'] - low_list) / (high_list - low_list) * 100
        k = rsv.ewm(com=m1-1, adjust=False).mean()
        d = k.ewm(com=m2-1, adjust=False).mean()
        j = 3 * k - 2 * d
        return k, d, j
    
    @staticmethod
    def detect_kdj_cross(k: pd.Series, d: pd.Series, j: pd.Series):
        """检测KDJ金叉死叉信号"""
        k_now, k_prev = k.iloc[-1], k.iloc[-2]
        d_now, d_prev = d.iloc[-1], d.iloc[-2]
        j_now = j.iloc[-1]
        
        golden_cross = k_prev < d_prev and k_now > d_now
        death_cross = k_prev > d_prev and k_now < d_now
        oversold = j_now < 20
        overbought = j_now > 80
        
        signal = None
        score = 0
        if golden_cross and j_now < 50:
            signal = 'KDJ金叉'
            score = 20
        elif death_cross and j_now > 70:
            signal = 'KDJ死叉'
            score = -10
        elif oversold:
            signal = 'KDJ超卖'
            score = 15
        elif overbought:
            signal = 'KDJ超买'
            score = -5
            
        return {
            'k': k_now, 'd': d_now, 'j': j_now,
            'golden_cross': golden_cross,
            'death_cross': death_cross,
            'oversold': oversold,
            'overbought': overbought,
            'signal': signal,
            'score': score
        }
    
    @staticmethod
    def calc_macd_short(df: pd.DataFrame, fast: int = 12, slow: int = 26, signal: int = 9):
        """计算MACD指标"""
        ema_fast = df['close'].ewm(span=fast, adjust=False).mean()
        ema_slow = df['close'].ewm(span=slow, adjust=False).mean()
        dif = ema_fast - ema_slow
        dea = dif.ewm(span=signal, adjust=False).mean()
        macd_hist = (dif - dea) * 2
        return dif, dea, macd_hist
    
    @staticmethod
    def detect_macd_cross(dif: pd.Series, dea: pd.Series, macd_hist: pd.Series):
        """检测MACD金叉死叉信号"""
        dif_now, dif_prev = dif.iloc[-1], dif.iloc[-2]
        dea_now = dea.iloc[-1]
        hist_now, hist_prev = macd_hist.iloc[-1], macd_hist.iloc[-2]
        
        golden_cross = dif_prev < dea.iloc[-2] and dif_now > dea_now
        death_cross = dif_prev > dea.iloc[-2] and dif_now < dea_now
        
        signal = None
        if golden_cross:
            signal = 'MACD金叉'
        elif death_cross:
            signal = 'MACD死叉'
        elif hist_now > 0 and hist_prev <= 0:
            signal = 'MACD翻红'
        elif hist_now < 0 and hist_prev >= 0:
            signal = 'MACD翻绿'
        elif hist_now > 0:
            signal = 'MACD多头'
        elif hist_now < 0:
            signal = 'MACD空头'
            
        return {
            'dif': dif_now, 'dea': dea_now, 'macd_hist': hist_now,
            'golden_cross': golden_cross,
            'death_cross': death_cross,
            'signal': signal
        }
    
    @staticmethod
    def calc_bollinger(df: pd.DataFrame, period: int = 20, std_dev: int = 2):
        """计算布林带指标"""
        middle = df['close'].rolling(window=period).mean()
        std = df['close'].rolling(window=period).std()
        upper = middle + std_dev * std
        lower = middle - std_dev * std
        return upper, middle, lower
    
    @staticmethod
    def detect_bollinger_signal(df: pd.DataFrame, upper: pd.Series, middle: pd.Series, lower: pd.Series):
        """检测布林带信号"""
        close = df['close'].iloc[-1]
        upper_now = upper.iloc[-1]
        middle_now = middle.iloc[-1]
        lower_now = lower.iloc[-1]
        
        bandwidth = (upper_now - lower_now) / middle_now * 100
        position_pct = (close - lower_now) / (upper_now - lower_now) * 100 if upper_now != lower_now else 50
        
        prev_close = df['close'].iloc[-2]
        prev_lower = lower.iloc[-2]
        
        signal = None
        if prev_close <= prev_lower and close > lower_now:
            signal = '下轨反弹'
        elif close > upper_now:
            signal = '触及上轨'
        elif close < lower_now:
            signal = '跌破下轨'
        elif abs(close - middle_now) / middle_now < 0.02:
            signal = '中轨支撑'
        elif position_pct < 30:
            signal = '偏下轨'
        elif position_pct > 70:
            signal = '偏上轨'
            
        return {
            'upper': upper_now, 'middle': middle_now, 'lower': lower_now,
            'bandwidth': bandwidth,
            'position_pct': position_pct,
            'signal': signal
        }
    
    @staticmethod
    def detect_volume_surge(df: pd.DataFrame, ratio: float = 1.5):
        """检测成交量异动"""
        vol_now = df['volume'].iloc[-1]
        vol_avg = df['volume'].rolling(window=5).mean().iloc[-1]
        
        price_change = (df['close'].iloc[-1] - df['close'].iloc[-2]) / df['close'].iloc[-2] * 100
        volume_ratio = vol_now / vol_avg if vol_avg > 0 else 1
        
        surge_type = None
        if volume_ratio > ratio and price_change > 0:
            surge_type = '放量上涨'
        elif volume_ratio > ratio and price_change < 0:
            surge_type = '放量下跌'
        elif volume_ratio < 0.7 and price_change > 0:
            surge_type = '缩量上涨'
        elif volume_ratio < 0.7 and price_change < 0:
            surge_type = '缩量下跌'
            
        return {
            'volume_ratio': volume_ratio,
            'price_change': price_change,
            'surge_type': surge_type
        }
    
    @staticmethod
    def calc_atr_short(df: pd.DataFrame, period: int = 14):
        """计算ATR指标"""
        high_low = df['high'] - df['low']
        high_close = np.abs(df['high'] - df['close'].shift())
        low_close = np.abs(df['low'] - df['close'].shift())
        ranges = pd.concat([high_low, high_close, low_close], axis=1)
        true_range = np.max(ranges, axis=1)
        atr = true_range.rolling(window=period).mean()
        return atr
    
    @staticmethod
    def calc_trade_points(current_price: float, atr: float, 
                          stop_multiplier: float = 2.0, 
                          profit_multiplier: float = 3.0):
        """计算交易点位"""
        stop_loss = current_price - atr * stop_multiplier
        take_profit = current_price + atr * profit_multiplier
        
        return {
            'entry_price': round(current_price, 2),
            'stop_loss': round(stop_loss, 2),
            'take_profit': round(take_profit, 2),
            'atr': round(atr, 3),
            'risk_reward_ratio': round(profit_multiplier / stop_multiplier, 2)
        }
